import axios from "axios";
import React, { FormEvent, useState } from "react";
import { setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/router";

interface Props {}

const Login: React.FC<Props> = (props) => {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const excLogin = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post("/api/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      .then(() => {
        setCookie(null, "admin_mode", "true", {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/");
      })
      .catch((err) => destroyCookie(null, "admin_mode"));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="w-3/4 flex flex-col items-center gap-4"
        onSubmit={excLogin}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-start w-full">EMAIL</div>
          <input
            className="w-full border-2 rounded-md p-2 outline-none"
            type="text"
            name="email"
            required
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start w-full">PASSWORD</div>
          <input
            className="w-full border-2 rounded-md p-2 outline-none"
            type="password"
            name="password"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <button className="border-2 rounded-md p-2" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
