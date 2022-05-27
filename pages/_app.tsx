import "../styles/globals.css";
import type { AppProps } from "next/app";
import Appbar from "../components/common/Appbar";
import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "../store";
import Footer from "../components/common/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNprogress
        color="#ab47bc"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Appbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;
