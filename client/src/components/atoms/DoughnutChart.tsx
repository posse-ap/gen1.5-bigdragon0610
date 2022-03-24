import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    datalabels: {
      color: "white",
      font: {
        size: 10,
      },
      formatter(value, ctx) {
        const studyingHours = ctx.dataset.data;
        const totalStudyingHours = studyingHours.reduce((sum, element) => {
          return sum + element;
        });
        return Math.round((value / totalStudyingHours) * 100) + "%";
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 10,
    },
  },
};

type Props = {
  data: {
    label: string;
    studyingHours: number;
    backgroundColor: string;
  }[];
};

const DoughnutChart: React.VFC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((datum) => datum.label),
    datasets: [
      {
        data: data.map((datum) => datum.studyingHours),
        backgroundColor: data.map((datum) => datum.backgroundColor),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="relative w-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
