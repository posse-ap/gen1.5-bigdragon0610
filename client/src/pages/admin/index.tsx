import Head from "next/head";
import Image from "next/image";
import Form from "@/components/admin/Form";
import { useEffect, useState, VFC } from "react";
import axios from "@/libs/axios";

const Admin: VFC = () => {
  type data = {
    id: number;
    name: string;
    deleted_at: Date | null;
  };
  const [contents, setContents] = useState<Array<data>>([]);
  const [languages, setLanguages] = useState<Array<data>>([]);

  useEffect(() => {
    const fetch = async () => {
      const languages_res = await axios.get("/api/admin/language");
      setLanguages(languages_res.data);
      const contents_res = await axios.get("/api/admin/teaching_material");
      setContents(contents_res.data);
    };
    fetch();
  }, []);

  const addForm = (data: Array<data>, setData: Function) => {
    setData((prev: Array<data>) => [
      ...prev,
      {
        id: data.length + 1,
        name: "",
        deleted_at: null,
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
              if (content.deleted_at) return;
              return (
                <Form
                  id={content.id}
                  name={content.name}
                  setData={setContents}
                />
              );
            })}
          </ul>
          <button
            className='flex gap-1 items-center mt-2'
            onClick={() => addForm(contents, setContents)}
          >
            <Image src='/images/add.svg' width='20' height='20' />
            <span>追加</span>
          </button>
        </section>
        <section className='w-1/2'>
          <p className='font-bold text-lg'>学習言語</p>
          <ul className='mt-2 flex flex-col gap-2'>
            {languages.map((language) => {
              if (language.deleted_at) return;
              return (
                <Form
                  id={language.id}
                  name={language.name}
                  setData={setLanguages}
                />
              );
            })}
          </ul>
          <button
            className='flex gap-1 items-center mt-2'
            onClick={() => addForm(languages, setLanguages)}
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
