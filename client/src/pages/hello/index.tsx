import type { NextPage } from "next";
import useSWR from "swr";
import axios from "@/libs/axios";
import { useEffect, useState } from "react";
// import { useSnackbar } from "notistack";

const Hello: NextPage = () => {
  // const { data, error } = useSWR("/api/hello", () =>
  //   axios.get("/api/hello").then((res: any) => res.data).catch(e => console.error(e))
  // );

  // if (error) return <div>エラーが発生しました</div>;
  // if (!data) return <div>読み込み中</div>;

  // const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/bar_chart");
        setData(res.data);
      } catch (e) {
        console.error(e);
        // enqueueSnackbar("エラーが発生しました。");
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <h1>ようこそ</h1>
      <p>{data[1]}</p>
    </div>
  );
};

export default Hello;
