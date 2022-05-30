import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import PostCard from "../../components/post/PostCard";
import useAuth from "../../hooks/useAuth";
import Head from "next/head";
import { FaSearch } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import Loading from "../../components/common/Loading";
import { searchPostApi } from "../../services/postApi";

interface Props {
  posts?: any;
}

const Posts: React.FC<Props> = ({ posts }) => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPosts(posts);
  }, []);

  const excSearch = async (e: FormEvent) => {
    e.preventDefault();
    return searchPostApi(searchValue, searchCategory);
  };

  const mutation = useMutation(excSearch, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      setCurrentPosts(data);
      queryClient.invalidateQueries("searchPostData");
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  return (
    <div>
      <Head>
        <title>YORU POSTS</title>
        <meta name="description" content="please check my posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        {isLoading && <Loading />}
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
          <div className="flex justify-center p-4">
            <form
              className="flex mobile:flex-col gap-1"
              onSubmit={mutation.mutate}
            >
              <div className="border-2 flex items-center p-1 rounded-lg">
                <label className="font-bold text-xs">CATEGORY</label>
                <select
                  className="p-2 rounded-lg h-full outline-none"
                  onChange={(e) => {
                    setSearchCategory(e.target.value);
                  }}
                >
                  <option value="">ALL</option>
                  <option value="daily">DAILY</option>
                  <option value="development">DEVELOPMENT</option>
                  <option value="food">FOOD</option>
                  <option value="travel">TRAVEL</option>
                  <option value="gurume">GURUME</option>
                </select>
              </div>
              <div className="border-2 flex items-center p-1 rounded-lg">
                <FaSearch />
                <input
                  className="p-2 rounded-lg h-full outline-none"
                  type="text"
                  placeholder="Search"
                  name="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <button className="border-2 p-2 rounded-lg font-bold">
                SEARCH
              </button>
            </form>
          </div>
          <div className="overflow-auto h-128">
            <div className="p-6 flex justify-center flex-wrap gap-6">
              {currentPosts.length === 0 && (
                <div className="font-bold text-xl">SEARCH RESULT NOT FOUND</div>
              )}
              {currentPosts?.map((post: any, index: number) => (
                <PostCard post={post} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await axios.get(`${process.env.HOST_URL}/api/post`, {
    params: { page: 1 },
  });
  return {
    props: {
      posts: data,
    },
  };
};

export default Posts;
