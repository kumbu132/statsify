import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useStatsifyContext } from "../context/context";
import HomeButton from "../components/HomeButton/HomeButton";
import { fetchUserTopTracks } from "../utils";
import Track from "../components/Track/Track";

const Tracks = () => {
  const router = useRouter();
  const { isLoggedIn, user, setIsLoading } = useStatsifyContext();
  const tabs = ["last month", "last 6 months", "all time"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetchUserTopTracks(
        `${
          activeTab === "last month"
            ? "short_term"
            : activeTab === "all time"
            ? "long_term"
            : "medium_term"
        }`
      );
      if (res.status && res.status !== 200) {
        router.push("/error");
      }
      setTopTracks(res.data?.items);
      setIsLoading(false);
    };

    if (isLoggedIn) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [isLoggedIn, setIsLoading, router, activeTab]);
  return (
    <>
      <Head>
        <title>Statsify | Top Tracks</title>
        <meta name="description" content="Find out your listening habits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full min-h-screen max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa mx-[auto]">
        <HomeButton />
        {isLoggedIn && user && (
          <div className="flex flex-col justify-center items-center w-full p-5 rounded-md">
            <h1>Tracks</h1>{" "}
            <div className="w-full h-[60px] flex justify-between items-center">
              {tabs.map((tab, idx) => (
                <p
                  className={`border w-[33%] flex justify-center items-center cursor-pointer hover:brightness-110 capitalize ${
                    activeTab === tab ? "bg-[#1db954]" : "bg-[#fafafa] text-black"
                  }`}
                  key={idx}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2 w-[95%] text-[#fafafa]">
              {topTracks.map((item, index) => (
                <Track track={item} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default Tracks;
