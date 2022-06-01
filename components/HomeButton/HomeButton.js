import Link from "next/link";
import Image from "next/image";

const HomeButton = () => {
  return (
    <div className="absolute left-[25px] top-[20px] cursor-pointer hover:brightness-110">
      <Link href="/">
        <a>
          <div className="w-[30px] h-[30px]">
            <Image src="/images/home-icon.svg" alt="home" layout="fill" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default HomeButton;
