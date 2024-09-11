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
  consumptionMode:boolean;
};

const MixedChart: React.FC<Props> = ({ consumptionMode,avgDataList, userDataList }) => {
  const currentDate = `${new Date().getFullYear()}.${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}`;
  const chartTitle = consumptionMode
    ? "소비 그래프"
    : "혜택 그래프";
    const backgroundColor = consumptionMode?"#FFAAE7":"#D7D9FF"

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
        backgroundColor: backgroundColor,
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
        display: true, // 제목을 표시할지 여부
        text:chartTitle, // 제목 텍스트
        font: {
          size: 18 // 제목 폰트 크기
        },
        align: 'center', // 제목을 중앙에 정렬
      }
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
