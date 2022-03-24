import React from "react";
import DoughnutChartContainer from "@/components/molecules/DoughnutChartContainer";

const DoughnutChartContainerWrapper: React.VFC = () => {
  return (
    <div className="grid gap-x-5 grid-cols-2">
      <DoughnutChartContainer
        title={"学習コンテンツ"}
        data={[
          {
            label: "ドットインストール",
            studyingHours: 30,
            backgroundColor: "#0445EC",
          },
          {
            label: "N予備校",
            studyingHours: 15,
            backgroundColor: "#0F70BD",
          },
          {
            label: "POSSE課題",
            studyingHours: 7,
            backgroundColor: "#20BDDE",
          },
        ]}
      />
      <DoughnutChartContainer
        title={"学習言語"}
        data={[
          {
            label: "JavaScript",
            studyingHours: 1,
            backgroundColor: "#0445EC",
          },
          {
            label: "CSS",
            studyingHours: 3,
            backgroundColor: "#0F70BD",
          },
          {
            label: "PHP",
            studyingHours: 5,
            backgroundColor: "#20BDDE",
          },
          {
            label: "HTML",
            studyingHours: 4,
            backgroundColor: "#3CCEFE",
          },
          {
            label: "Laravel",
            studyingHours: 7,
            backgroundColor: "#B29EF3",
          },
          {
            label: "SQL",
            studyingHours: 8,
            backgroundColor: "#6C46EB",
          },
          {
            label: "SHELL",
            studyingHours: 3,
            backgroundColor: "#4A17EF",
          },
          {
            label: "情報システム基礎知識(その他)",
            studyingHours: 6,
            backgroundColor: "#3005C0",
          },
        ]}
      />
    </div>
  );
};

export default DoughnutChartContainerWrapper;
