import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import React from "react";
import useAuth from "../../hooks/useAuth";

type Props = {};

const Appbar = (props: Props) => {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const excLogout = () => {
    destroyCookie(null, "admin_mode");
    router.reload();
  };
  return (
    <div className="fixed z-50 w-screen h-16 flex items-center justify-end pr-6 font-bold">
      <div className="bg-slate-400 bg-opacity-40 p-3 rounded-lg flex items-center gap-5">
        <Link href="/">
          <a>HOME</a>
        </Link>
        <Link href="/posts">
          <a>POSTS</a>
        </Link>
        {isAdmin && (
          <button className="font-bold" onClick={excLogout}>
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
};

export default Appbar;
