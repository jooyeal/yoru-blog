import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/home/Banner";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>YORULOG</title>
        <meta name="description" content="my personal blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
    </div>
  );
};

export default Home;
