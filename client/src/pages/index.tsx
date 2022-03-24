import Head from "next/head";
import Header from "@/components/molecules/Header";
import Main from "@/components/organisms/Main";
import LearningTimeWrapper from "@/components/molecules/LearningTimeWrapper";
import BarChart from "@/components/atoms/BarChart";
import DoughnutChartContainerWrapper from "@/components/organisms/DoughnutChartContainerWrapper";
import Pagination from "@/components/atoms/Pagination";
import RecordButton from "@/components/atoms/RecordButton";

const Home: React.VFC = () => {
  return (
    <div>
      <Head>
        <title>TOP PAGE</title>
        <meta name="description" content="to record study time" />
      </Head>
      <Header />
      <Main>
        <LearningTimeWrapper />
        <BarChart />
        <DoughnutChartContainerWrapper />
        <Pagination />
        <RecordButton />
      </Main>
    </div>
  );
};

export default Home;
