import axios from "axios";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const querystring = require("querystring");
let authorization = "";

const accountsApi = axios.create({
  baseURL: "https://accounts.spotify.com/",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${new Buffer.from(
      `${CLIENT_ID}:${CLIENT_SECRET}`
    ).toString("base64")}`,
  },
});

export async function fetchUserDetails(reqCode) {
  const tokenRes = await accountsApi.post(
    "/api/token",
    querystring.stringify({
      grant_type: "authorization_code",
      code: reqCode,
      redirect_uri: REDIRECT_URI,
    })
  );

  if (tokenRes.status == 200) {
    authorization = `${tokenRes.data.token_type} ${tokenRes.data.access_token}`;

    localStorage.setItem(
      "authorization",
      JSON.stringify({ time: Date.now(), data: tokenRes.data })
    );

    const userApi = axios.create({
      baseURL: "https://api.spotify.com/v1/",
      headers: {
        Authorization: `${tokenRes.data.token_type} ${tokenRes.data.access_token}`,
      },
    });
    try {
      const res = await userApi.get("/me");
      return res;
    } catch (error) {
      return { status: 403 };
    }
  } else {
    return null;
  }
}

export async function fetchUser() {
  const auth = JSON.parse(localStorage.getItem("authorization"));
  authorization = `${auth.data.token_type} ${auth.data.access_token}`;
  const userApi = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: authorization,
      "content-type": "application/json",
    },
  });
  try {
    return await userApi.get("/me");
  } catch (error) {
    return { status: 403 };
  }
}

export async function fetchUserRecentlyPlayed() {
  const userApi = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: authorization,
      "content-type": "application/json",
    },
  });

  try {
    return await userApi.get("/me/player/recently-played");
  } catch (error) {
    return { status: 403 };
  }
}

export function checkIfTokenValid() {
  const token = localStorage.getItem("authorization");
  if (token) {
    const tokenData = JSON.parse(token);
    if (tokenData.time + 3600000 > Date.now()) {
      return true;
    }
  }
  return false;
}

export async function fetchUserTopArtists(timeRange) {
  const userApi = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: authorization,
      "content-type": "application/json",
    },
  });

  try {
    return await userApi.get(`/me/top/artists?limit=50&time_range=${timeRange}`);
  } catch (error) {
    return { status: 403 };
  }
}

export async function fetchUserTopTracks(timeRange) {
  const userApi = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: authorization,
      "content-type": "application/json",
    },
  });

  try {
    return await userApi.get(`/me/top/tracks?limit=50&time_range=${timeRange}`);
  } catch (error) {
    return { status: 403 };
  }
}

export async function fetchUserTopGenres(timeRange) {
  const res = await fetchUserTopArtists(timeRange);
  if (res.status == 200) {
    // count different genres
    const genres = {};
    res.data.items.forEach((artist) => {
      artist.genres.forEach((genre) => {
        if (genres[genre]) {
          genres[genre]++;
        } else {
          genres[genre] = 1;
        }
      });
    });
    return { status: 200, data: genres };
  }
  return { status: 403 };
}
