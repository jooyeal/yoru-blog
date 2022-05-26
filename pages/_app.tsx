import "../styles/globals.css";
import type { AppProps } from "next/app";
import Appbar from "../components/common/Appbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Appbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
