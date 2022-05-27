import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard";
import useAuth from "../../hooks/useAuth";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroller";

interface Props {
  posts?: any;
}

const Posts: React.FC<Props> = ({ posts }) => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    setCurrentPosts(posts);
  }, []);

  const getNextPage = async () => {
    const { data } = await axios.get(
      `${process.env.HOST_URL}/api/post`,
      // "http://localhost:3000/api/post",
      { params: { page: currentPage + 1 } }
    );
    setCurrentPage((prev) => prev + 1);
    setCurrentPosts(data);
    if (data.length < (currentPage + 1) * 5) {
      setHasMore(false);
    }
  };

  return (
    <div>
      <Head>
        <title>YORU POSTS</title>
        <meta name="description" content="please check my posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        {isAdmin && (
          <Link href="/regist">
            <a className="fixed bottom-6 right-6 bg-slate-400 bg-opacity-40 p-3 rounded-lg z-50">
              ADD POST
            </a>
          </Link>
        )}
        <div>
          <div className="relative w-screen h-screen">
            <Image src="/blog_banner.jpeg" layout="fill" />
            <div className="w-full h-full z-20 absolute flex flex-col justify-center items-center text-9xl mobile:text-7xl font-bold">
              <div className="w-2/3">{`CHECK MY`}</div>
              <div className="w-2/3">{`POSTS.`}</div>
            </div>
          </div>
          {/* <div className="overflow-auto h-96"> */}
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextPage}
            hasMore={hasMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <div className="p-6 flex justify-center flex-wrap gap-6">
              {currentPosts?.map((post: any, index: number) => (
                <PostCard post={post} key={index} />
              ))}
            </div>
          </InfiniteScroll>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(
    `${process.env.HOST_URL}/api/post`,
    // "http://localhost:3000/api/post",
    { params: { page: 1 } }
  );
  return {
    props: {
      posts: data,
    },
  };
};

export default Posts;
