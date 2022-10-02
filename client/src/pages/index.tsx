import Head from "next/head";
import Header from "@/components/molecules/Header";
import Main from "@/components/organisms/Main";
import LearningTimeWrapper from "@/components/molecules/LearningTimeWrapper";
import BarChart from "@/components/atoms/BarChart";
import DoughnutChartContainerWrapper from "@/components/organisms/DoughnutChartContainerWrapper";
import Pagination from "@/components/atoms/Pagination";
import RecordButton from "@/components/atoms/RecordButton";
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import RecordModal from "@/components/organisms/RecordModal";

type dateContextDefaultValue = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};
export const DateContext = createContext<dateContextDefaultValue | null>(null);

const Home: React.VFC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal: MouseEventHandler = () => {
    setModalIsOpen(true);
  };

  const [date, setDate] = useState(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      <Head>
        <title>TOP PAGE</title>
        <meta name='description' content='to record study time' />
      </Head>
      <Header />
      <Main>
        <LearningTimeWrapper />
        <BarChart />
        <DoughnutChartContainerWrapper />
        <Pagination />
        <RecordButton onClick={openModal} />
      </Main>
      <RecordModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </DateContext.Provider>
  );
};

export default Home;
