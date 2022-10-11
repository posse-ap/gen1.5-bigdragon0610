import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "@/libs/axios";
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
import { DateContext } from "@/pages";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

function createGradient(ctx, area, height, max) {
  const colorStart = "#1876BF";
  const colorEnd = "#57D6FF";
  let top = 0;
  if (height > 0) {
    top = (area.bottom / max) * (max - height);
  }

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

const BarChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const { date } = useContext(DateContext);

  useEffect(() => {
    try {
      const fetch = async () => {
        const studyHours = [];
        const currentDate = date;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const res = await axios.get(
          `/api/bar_chart?year=${year}&month=${month}`
        );
        for (let i = 0; i < Object.keys(res.data).length; i++) {
          studyHours[i] = res.data[i + 1];
        }

        const maxStudyHour = Math.max(...studyHours);
        const labels = studyHours.map(() => "");

        const newData = {
          labels,
          datasets: [
            {
              data: studyHours,
              borderRadius: 10,
              borderSkipped: false,
            },
          ],
        };
        const chart = chartRef.current;
        if (!chart) {
          return;
        }
        const chartData = {
          ...newData,
          datasets: newData.datasets.map((dataset) => ({
            ...dataset,
            backgroundColor: function (context) {
              return createGradient(
                chart.ctx,
                chart.chartArea,
                context.parsed.y,
                maxStudyHour
              );
            },
          })),
        };

        setChartData(chartData);
      };
      fetch();
    } catch (e) {
      console.error(e);
    }
  }, [date]);

  return (
    <div className='bg-white rounded-xl px-2 shadow-md'>
      <Bar options={options} ref={chartRef} data={chartData} />
    </div>
  );
};

export default BarChart;
