import { createContext, useContext, useState } from "react";
const StatsifyContext = createContext(undefined);

export function StatsifyProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  return (
    <StatsifyContext.Provider
      value={{
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        isLoggedIn,
        user,
        isLoading,
        setIsLoading,
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </StatsifyContext.Provider>
  );
}

export function useStatsifyContext() {
  const context = useContext(StatsifyContext);

  if (!context)
    throw new Error(
      "useStatsifyContext must be used inside an `StatsifyContextProvider`"
    );

  return context;
}
