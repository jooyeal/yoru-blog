import Image from "next/image";
import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="relative w-screen h-screen">
      <Image src="/blog_banner.jpeg" layout="fill" />
      <div className="w-full h-full z-20 absolute flex flex-col justify-center items-center text-9xl mobile:text-7xl font-bold">
        <div className="w-2/3">{`YORU's`}</div>
        <div className="w-2/3">{`BLOG.`}</div>
      </div>
    </div>
  );
};

export default Banner;
