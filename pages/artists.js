import { useStatsifyContext } from "../context/context";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/views/Loader";
import HomeButton from "../components/HomeButton/HomeButton";
import { fetchUserTopArtists } from "../utils";

const Artists = () => {
  const router = useRouter();
  const { isLoggedIn, user, isLoading, setIsLoading } = useStatsifyContext();
  const tabs = ["last month", "last 6 months", "all time"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetchUserTopArtists(
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
      setTopArtists(res.data?.items);
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
        <title>Statsify | Top Artists</title>
        <meta name="description" content="Find out your listening habits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loader />}
      <div className="w-full min-h-screen max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa] mx-[auto]">
        <HomeButton />
        {isLoggedIn && user && (
          <div className="flex flex-col items-center w-full p-5 rounded-md">
            <h1>Artists</h1>
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
            <div className="flex justify-around items-start flex-wrap gap-3 gap-y-8 md:gap-8">
              {topArtists.map((artist, idx) => (
                <div key={idx} className="w-[150px] md:w-[200px] my-1">
                  <Link href={artist.external_urls.spotify}>
                    <a className="flex flex-col justify-center items-center w-[150px] md:w-[200px]">
                      <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex justify-center items-center cursor-pointer hover:brightness-110 relative">
                        <Image
                          src={artist.images[0].url}
                          alt={artist.name}
                          layout="fill"
                        />
                      </div>
                      <p className="text-center w-[150px] md:w-[200px] text-xl mt-3 ">
                        {artist.name}
                      </p>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Artists;
