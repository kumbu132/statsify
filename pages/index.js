import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useStatsifyContext } from "../context/context";
import { fetchUserDetails, checkIfTokenValid, fetchUser } from "../utils";
import Loader from "../components/views/Loader";
import SignIn from "../components/views/SignIn";
import LandingPage from "../components/views/LandingPage";

export default function Home() {
  const { isLoggedIn, setIsLoggedIn, user, setUser, isLoading, setIsLoading } =
    useStatsifyContext();
  const router = useRouter();

  useEffect(() => {
    const setUserDetails = async () => {
      if (!user) {
        const res = await fetchUser();
        if (res.status && res.status === 200) {
          setIsLoggedIn(true);
          setUser(res.data);
        } else if (res.status && res.status === 503) {
        } else {
          setIsLoggedIn(false);
          setUser(null);
          router.push("/error");
        }
      }
    };

    const fetchData = async () => {
      const res = await fetchUserDetails(router.query.code);
      if (res.status === 403) {
        router.push("/error");
      } else if (res.data) {
        setUser(res.data);
        setIsLoggedIn(true);
        setIsLoading(false);
      }
    };

    setIsLoading(false);

    if (router.query.code && !user) {
      setIsLoading(true);
      try {
        fetchData();
        router.replace("/", undefined, { shallow: true });
      } catch (error) {
        console.error(error);
      }
    } else if (checkIfTokenValid()) {
      setUserDetails();
    }
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Head>
        <title>Statsify</title>
        <meta name="description" content="Find out your listening habits" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading && <Loader />}

      <main className="h-screen w-screen flex justify-center items-center bg-[#202121]">
        {!isLoggedIn && !isLoading && <SignIn />}
        {isLoggedIn && !isLoading && <LandingPage />}
      </main>
    </>
  );
}
