import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import PostCard from "../components/post/PostCard";

interface Props {
  posts: any;
}
const Home: React.FC<Props> = ({ posts }) => {
  const [recentlyPosts, setRecentlyPosts] = useState([]);
  const [dailyPosts, setDailyPosts] = useState([]);
  const [developmentPosts, setDevelopmentPosts] = useState([]);
  const [foodPosts, setFoodPosts] = useState([]);
  const [travelPosts, setTravelPosts] = useState([]);
  const [gurumePosts, setGurumePosts] = useState([]);

  useEffect(() => {
    if (posts) {
      setRecentlyPosts(posts.filter((post: any, index: number) => index < 5));
      setDailyPosts(
        posts.filter((post: any) => post.categories.includes("daily"))
      );
      setDevelopmentPosts(
        posts.filter((post: any) => post.categories.includes("development"))
      );
      setFoodPosts(
        posts.filter((post: any) => post.categories.includes("food"))
      );
      setTravelPosts(
        posts.filter((post: any) => post.categories.includes("travel"))
      );
      setGurumePosts(
        posts.filter((post: any) => post.categories.includes("gurume"))
      );
    }
  }, []);
  return (
    <div>
      <Head>
        <title>YORULOG</title>
        <meta name="description" content="my personal blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <div className="p-6">
        <div className="mb-6">
          <div className="text-3xl font-bold">RECENTLY</div>
          <div className="p-4 flex justify-center flex-wrap gap-6">
            {recentlyPosts?.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-3xl font-bold">DAILY</div>
          <div className="p-4 flex justify-center flex-wrap gap-6">
            {dailyPosts?.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-3xl font-bold">DEVELOPMENT</div>
          <div className="p-4 flex justify-center flex-wrap gap-6">
            {developmentPosts?.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-3xl font-bold">FOOD</div>
          <div className="p-4 flex justify-center flex-wrap gap-6">
            {foodPosts?.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-3xl font-bold">TRAVEL</div>
          <div className="p-4 flex justify-center flex-wrap gap-6">
            {travelPosts?.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-3xl font-bold">GURUME</div>
          <div className="p-4 flex justify-center flex-wrap gap-6">
            {gurumePosts?.map((post: any, index: number) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    `${process.env.HOST_URL}/api/post/recent`
    // `http://localhost:3000/api/post`
  );
  return {
    props: {
      posts: data,
    },
  };
};

export default Home;
