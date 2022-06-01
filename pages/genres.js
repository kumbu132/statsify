import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStatsifyContext } from "../context/context";
import { fetchUserTopGenres } from "../utils";

const Genres = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useStatsifyContext();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUserTopGenres();
      console.log({ res });
      if (res.status && res.status !== 200) {
        router.push("/error");
      }
    };
    if (isLoggedIn) {
      // TODO: fetch genres
      fetchData();
    } else {
      router.push("/");
    }
  });

  return (
    <div className="w-full h-screen max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa">
      {isLoggedIn && user && (
        <div className="flex flex-col justify-center items-center w-[250px] p-5 rounded-md">
          <h1>Genres</h1>
        </div>
      )}
    </div>
  );
};

export default Genres;
