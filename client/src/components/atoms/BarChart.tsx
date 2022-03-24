import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const studyHours = [
  1, 3, 5, 0, 4, 2, 7, 8, 0, 3, 6, 2, 1, 3, 0, 6, 4, 2, 7, 0, 9, 3, 6, 2, 4, 7,
  8, 0, 3, 6, 2,
];
const maxStudyHour = Math.max(...studyHours);
const labels = studyHours.map(() => "");
export const data = {
  labels,
  datasets: [
    {
      data: studyHours,
      borderRadius: 10,
      borderSkipped: false,
    },
  ],
};

function createGradient(ctx, area, height) {
  const colorStart = "#1876BF";
  const colorEnd = "#57D6FF";
  let top = 0;
  if (height > 0) {
    top = (area.bottom / maxStudyHour) * (maxStudyHour - height);
  }

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    xAxis: {
      display: true,
      grid: {
        display: false,
        borderColor: "transparent",
      },
      ticks: {
        callback: function (index) {
          if (index % 2 != 0) {
            return index + 1;
          }
        },
        color: "#97B9D1",
      },
    },
    yAxis: {
      grid: {
        display: false,
        borderColor: "transparent",
      },
      ticks: {
        callback: function (value, index) {
          if (index % 2 == 0) {
            return value + "h";
          }
        },
        color: "#97B9D1",
      },
    },
  },
};

const BarChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: function (context) {
          return createGradient(chart.ctx, chart.chartArea, context.parsed.y);
        },
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <div className="bg-white rounded-xl px-2 shadow-md">
      <Bar options={options} ref={chartRef} data={chartData} />
    </div>
  );
};

export default BarChart;
