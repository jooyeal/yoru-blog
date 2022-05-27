import Link from "next/link";
import React from "react";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  return (
    <div className="w-screen h-32 bg-stone-800 text-white flex items-center justify-center font-bold">
      <div className="basis-1/2 p-6 flex">
        <Link href="https://yoru-homepage-nextjs.vercel.app/">
          <a className="border-b-2">YORU WEBSITE</a>
        </Link>
      </div>
      <div className="basis-1/2 p-6"></div>
    </div>
  );
};

export default Footer;
