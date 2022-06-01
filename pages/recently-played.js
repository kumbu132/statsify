import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useStatsifyContext } from "../context/context";
import { fetchUserRecentlyPlayed } from "../utils";
import HomeButton from "../components/HomeButton/HomeButton";
import Track from "../components/Track/Track";
import Loader from "../components/views/Loader";

const RecentlyPlayed = () => {
  const router = useRouter();
  const { isLoggedIn, user, isLoading, setIsLoading } = useStatsifyContext();
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetchUserRecentlyPlayed();
      console.log({ res });
      if (res.status && res.status !== 200) {
        router.push("/error");
      }
      setRecentlyPlayed(res.data.items);
      setIsLoading(false);
      console.log(JSON.parse(localStorage.getItem("authorization")));
    };
    if (isLoggedIn) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [router, isLoggedIn, setIsLoading]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative min-h-screen max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa] bg-[#202121] mx-[auto]">
        <HomeButton />

        {isLoggedIn && user && (
          <div className="flex flex-col items-center p-5 rounded-md w-full h-full max-w-3xl">
            <h1 className="mb-4 uppercase text-3xl md:text-4xl">Recently Played</h1>
            <div className="flex flex-col gap-2 w-[95%]">
              {recentlyPlayed.map((item, index) => (
                <Track track={item.track} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecentlyPlayed;
