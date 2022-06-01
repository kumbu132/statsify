import { useStatsifyContext } from "../context/context";
import { useState } from "react";

const Artists = () => {
  const { isLoggedIn, user } = useStatsifyContext();

  return (
    <>
      <div className="w-full h-screen max-w-screen-xl flex justify-center items-center flex-col shadow-3xl rounded-[5px] text-[#fafafa">
        {isLoggedIn && user && (
          <div className="flex flex-col justify-center items-center w-[250px] p-5 rounded-md">
            <h1>Artists</h1>
          </div>
        )}
      </div>{" "}
    </>
  );
};

export default Artists;
