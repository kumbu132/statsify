import Link from "next/link";

const Error = () => {
  return (
    <div className="flex w-screen h-screen p-10 text-white bg-[#202121] justify-center items-center text-center text-xl flex-col gap-8">
      <p>
        There were some issues with accessing Spotify&apos;s server. Please try again
        later.
      </p>
      <Link href="/">
        <a className="text-white">Go back to home</a>
      </Link>
    </div>
  );
};

export default Error;
