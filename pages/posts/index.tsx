import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostCard from "../../components/post/PostCard";

interface Props {
  posts?: any;
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="relative">
      <Link href="/regist">
        <a className="fixed bottom-6 right-6 bg-slate-400 bg-opacity-40 p-3 rounded-lg z-50">
          ADD POST
        </a>
      </Link>
      <div>
        <div className="relative w-screen h-screen">
          <Image src="/blog_banner.jpeg" layout="fill" />
          <div className="w-full h-full z-20 absolute flex flex-col justify-center items-center text-9xl mobile:text-7xl font-bold">
            <div className="w-2/3">{`CHECK MY`}</div>
            <div className="w-2/3">{`POSTS.`}</div>
          </div>
        </div>
        <div className="p-6 flex justify-center flex-wrap gap-6">
          {posts?.map((post: any, index: number) => (
            <PostCard post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get("http://localhost:3000/api/post");
  return {
    props: {
      posts: data,
    },
  };
};

export default Posts;
