import Link from "next/link";
import React from "react";

type Props = {};

const Appbar = (props: Props) => {
  return (
    <div className="fixed z-50 w-screen h-16 flex items-center justify-end pr-6">
      <div className="bg-slate-400 bg-opacity-40 p-3 rounded-lg flex items-center gap-5">
        <Link href="/">
          <a>HOME</a>
        </Link>
        <Link href="/posts">
          <a>POSTS</a>
        </Link>
      </div>
    </div>
  );
};

export default Appbar;
