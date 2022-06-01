import Link from "next/link";
import Image from "next/image";
import { useStatsifyContext } from "../../context/context";
const LandingPage = () => {
  const { user } = useStatsifyContext();
  return (
    <div className="w-full m-[10px] h-[95%] max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa]">
      <div className="w-[200px] h-[200px] rounded-[50%] mb-5 flex justify-center items-center relative overflow-hidden border-[#1DB954] border-solid border-4 p-2">
        <Image
          src={user?.images[0]?.url || "/images/loader.svg"}
          alt={user?.display_name}
          layout="fill"
        />
      </div>
      <h1 className="flex justify-center items-center text-2xl select-none w-[300px] h-[50px]">
        Welcome, {user?.display_name}
      </h1>
      <h2 className="mt-2 text-2xl">View your statistics</h2>
      <div className="flex flex-col justify-center items-center w-[250px] p-5 mt-5 rounded-md shadow-sm cursor-pointer  gap-2">
        <Link href="/tracks">
          <a>
            <div className="flex justify-center items-center bg-[#1DB954] w-[200px] h-[50px] text-xl rounded-md hover:brightness-110 select-none">
              Top Tracks
            </div>
          </a>
        </Link>
        <Link href="/artists">
          <a>
            <div className="flex justify-center items-center bg-[#1DB954] w-[200px] h-[50px] text-xl rounded-md hover:brightness-110 select-none">
              Top Artists
            </div>
          </a>
        </Link>
        <Link href="/genres">
          <a>
            <div className="flex justify-center items-center bg-[#1DB954] w-[200px] h-[50px] text-xl rounded-md hover:brightness-110 select-none">
              Top Genres
            </div>
          </a>
        </Link>
        <Link href="/recently-played">
          <a>
            <div className="flex justify-center items-center bg-[#1DB954] w-[200px] h-[50px] text-xl rounded-md hover:brightness-110 select-none">
              Recently Played
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
