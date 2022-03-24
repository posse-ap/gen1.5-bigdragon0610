import React from "react";
import DoughnutChart from "@/components/atoms/DoughnutChart";

type Props = {
  title: string;
  data: Data[];
};

type Data = {
  label: string;
  studyingHours: number;
  backgroundColor: string;
};

const DoughnutChartContainer: React.VFC<Props> = ({ title, data }) => {
  const labels = data.map((datum) => datum.label);

  return (
    <div className="bg-white rounded-xl shadow-md mt-5">
      <p className="font-bold ml-5 mt-5 pb-3">{title}</p>
      <DoughnutChart data={data} />
      <div>
        <style>
          {data.map(
            (datum, index) =>
              `.bg-label${index} {
                background: ${datum.backgroundColor};
              }`
          )}
        </style>
        <section className="flex flex-wrap p-2 gap-x-2">
          {data.map((datum, index) => (
            <p key={datum.label} className="text-xs text-[#686868]">
              <span
                className={`w-2 h-2 block mr-1 rounded-full bg-label${index} inline-block`}
              ></span>
              <span>{datum.label}</span>
            </p>
          ))}
        </section>
      </div>
    </div>
  );
};

export default DoughnutChartContainer;
