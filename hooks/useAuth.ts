import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

interface Props {}

const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.admin_mode) {
      cookies.admin_mode === "true";
      setIsAdmin(true);
    }
  }, []);
  return { isAdmin };
};

export default useAuth;
