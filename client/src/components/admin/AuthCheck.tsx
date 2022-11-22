import axios from "@/libs/axios";
import { ReactNode, useEffect, useState, VFC } from "react";

interface props {
  children: ReactNode;
}

const AuthCheck: VFC<props> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const authCheck = async () => {
      const user = await axios.get("api/user");
      setIsAdmin(user.data.is_admin ? true : false);
    };
    authCheck();
  }, []);

  if (isAdmin) {
    return <div>{children}</div>;
  } else if (isAdmin === false) {
    return <p className='font-bold m-5'>アクセス権限がありません。</p>;
  }
  return <p className='font-bold m-5'>ユーザー確認中…</p>;
};

export default AuthCheck;
