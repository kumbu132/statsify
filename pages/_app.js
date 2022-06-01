import { StatsifyProvider } from "../context/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StatsifyProvider>
      <Component {...pageProps} />
    </StatsifyProvider>
  );
}

export default MyApp;
