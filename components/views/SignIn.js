import Link from "next/link";
const SignIn = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return (
    <div className="w-full m-[10px] h-[95%] max-w-screen-xl flex justify-center items-center flex-col shadow-2xl rounded-[5px] text-[#fafafa]">
      <h1 className="flex justify-center items-center text-2xl select-none w-[300px] h-[50px]">
        Sign In to get started!
      </h1>
      <Link
        href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-read-currently-playing%20user-read-recently-played%20user-top-read`}
      >
        <a className="flex justify-center items-center w-[200px] h-[50px] mt-5 rounded-md shadow-sm bg-[#13421f] cursor-pointer hover:brightness-[1.1] ">
          SIGN IN
        </a>
      </Link>
    </div>
  );
};

export default SignIn;
