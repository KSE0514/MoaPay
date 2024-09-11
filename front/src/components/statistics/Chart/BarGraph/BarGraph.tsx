import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

// Chart.js에서 사용할 요소를 등록
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

type Props = {
  userDataList: number[];
  avgDataList: number[];
};

const MixedChart: React.FC<Props> = ({ avgDataList, userDataList }) => {
  const currentDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}`;

  const data = {
    labels: [
      "2024.1",
      "2024.2",
      "2024.3",
      "2024.4",
      "2024.5",
      "2024.6",
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
      //   { currentDate },
    ],
    datasets: [
      {
        type: "line",
        data: avgDataList,
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 2,
        fill: false,
      },
      {
        type: "bar",
        data: userDataList,
        backgroundColor: "#ffaae7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 차트의 기본 비율을 유지하지 않음
    plugins: {
      legend: {
        display: false, // 범례(그래프 이름)를 비활성화
      },
      title: {
        display: false, // 타이틀을 비활성화
      },
    },
  };

  return (
    <Chart
      style={{ height: "100%" }}
      type="bar"
      data={data}
      options={options}
    />
  );
};

export default MixedChart;
