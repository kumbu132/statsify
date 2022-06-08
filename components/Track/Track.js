import Image from "next/image";
import Link from "next/link";

const Track = ({ track }) => {
  return (
    <div className="w-full flex  gap-2 h-[70px] md:h-[80px] items-center justify-between px-4 border rounded select-none hover:brightness-110 hover:bg-[#363636]">
      <div className="w-[50px] md:w-[60px] flex justify-center items-center h-[50px] md:h-[60px] p-2 relative ">
        <Image
          src={track.album?.images[0]?.url || "/images/loader.svg"}
          alt="cover-art"
          layout="fill"
        />
      </div>
      <div className="p-2 w-[80%] overflow-y-clip">
        <p className="font-bold text-sm md:text-lg">{track.name}</p>
        <div className="flex gap-2 items-center">
          {track.artists.map((artist, index) => (
            <p key={index} className="text-sm md:text-base">
              {artist.name}
              {index !== track.artists.length - 1 && ", "}
            </p>
          ))}
        </div>
      </div>
      <Link href={track.external_urls.spotify}>
        <a>
          <div className="w-[30px]  flex justify-center items-center h-[30px] p-2 relative cursor-pointer">
            <Image src="/images/play-icon.svg" alt="play" layout="fill" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Track;
