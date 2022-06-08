import { useRouter } from "next/router";
import { PieChart } from "react-minimal-pie-chart";
import { useEffect, useState } from "react";
import { useStatsifyContext } from "../context/context";
import { fetchUserTopGenres } from "../utils";
import HomeButton from "../components/HomeButton/HomeButton";

const Genres = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useStatsifyContext();
  const tabs = ["last month", "last 6 months", "all time"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUserTopGenres(
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
      } else {
        const temp = [];
        for (const genre in res.data) {
          temp.push({
            title: genre,
            value: res.data[genre],
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            active: false,
          });
        }
        const sortedGenres = temp.sort((a, b) => b.value - a.value).slice(0, 10);
        setGenres(sortedGenres);
      }
    };
    if (isLoggedIn) {
      fetchData();
    } else {
      router.push("/");
    }
  }, [isLoggedIn, router, activeTab]);

  return (
    <div className="w-full min-h-screen max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa]">
      <HomeButton />
      {isLoggedIn && user && (
        <div className="flex flex-col justify-center items-center max-w-[500px] p-5 rounded-md">
          <h1>Genres</h1>
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
          <PieChart data={genres} />
          <div className="flex flex-col gap-2 mt-5 w-full">
            {genres.map((genre, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div
                    className={`w-[40px] h-[40px] rounded-sm`}
                    style={{ backgroundColor: genre.color }}
                  >
                    {" "}
                  </div>
                  <span>{idx + 1}.</span>
                </div>
                <p className="capitalize "> {genre.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Genres;
