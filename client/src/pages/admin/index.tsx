import Head from "next/head";
import Image from "next/image";
import Form from "@/components/admin/Form";
import { useEffect, useState, VFC } from "react";
import axios from "@/libs/axios";

const Admin: VFC = () => {
  type data = {
    id: number;
    name: string;
  };
  const [contents, setContents] = useState<Array<data>>([]);
  const [languages, setLanguages] = useState<Array<data>>([]);

  const DATASET = {
    language: {
      path: "/api/admin/language",
      setData: setLanguages,
    },
    content: {
      path: "/api/admin/teaching_material",
      setData: setContents,
    },
  };

  useEffect(() => {
    const fetch = async () => {
      Object.values(DATASET).forEach(async (d) => {
        const res = await axios.get(d.path);
        d.setData(res.data);
      });
    };
    fetch();
  }, []);

  const addData = async (d: string) => {
    const name = prompt("名前を入力して下さい");
    const res = await axios.post(DATASET[d].path, {
      name,
    });
    DATASET[d].setData((prev: Array<data>) => [
      ...prev,
      {
        id: res.data,
        name,
      },
    ]);
  };

  return (
    <div>
      <Head>
        <title>ADMIN PAGE</title>
        <meta name='description' content='admin page' />
      </Head>
      <main className='flex px-10 pt-10 w-full'>
        <section className='w-1/2'>
          <p className='font-bold text-lg'>学習コンテンツ</p>
          <ul className='mt-2 flex flex-col gap-2'>
            {contents.map((content) => {
              return (
                <Form
                  id={content.id}
                  name={content.name}
                  path={DATASET["content"].path}
                  setData={setContents}
                />
              );
            })}
          </ul>
          <button
            className='flex gap-1 items-center mt-2'
            onClick={() => addData("content")}
          >
            <Image src='/images/add.svg' width='20' height='20' />
            <span>追加</span>
          </button>
        </section>
        <section className='w-1/2'>
          <p className='font-bold text-lg'>学習言語</p>
          <ul className='mt-2 flex flex-col gap-2'>
            {languages.map((language) => {
              return (
                <Form
                  id={language.id}
                  name={language.name}
                  path={DATASET["language"].path}
                  setData={setLanguages}
                />
              );
            })}
          </ul>
          <button
            className='flex gap-1 items-center mt-2'
            onClick={() => addData("language")}
          >
            <Image src='/images/add.svg' width='20' height='20' />
            <span>追加</span>
          </button>
        </section>
      </main>
    </div>
  );
};

export default Admin;
