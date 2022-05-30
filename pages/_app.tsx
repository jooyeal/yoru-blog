import "../styles/globals.css";
import type { AppProps } from "next/app";
import Appbar from "../components/common/Appbar";
import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "../store";
import Footer from "../components/common/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default MyApp;
