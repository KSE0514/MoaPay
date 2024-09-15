import React, { useEffect, useState, useRef } from "react";
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
  consumptionMode: boolean;
};

const MixedChart: React.FC<Props> = ({
  consumptionMode,
  avgDataList,
  userDataList,
}) => {
  const [months, setMonths] = useState<string[]>([]);
  const chartRef = useRef<any>(null);
  const [xRange, setXRange] = useState<{ min: number; max: number }>({
    min: 6,
    max: 11, // 처음에는 6개월만 표시
  });

  const chartTitle: string = consumptionMode ? "소비 그래프" : "혜택 그래프";
  const backgroundColor: string = consumptionMode ? "#FFAAE7" : "#D7D9FF";

  useEffect(() => {
    const getLast12Months = () => {
      const result: string[] = [];
      const now = new Date(); // 현재 년, 월을 기록

      for (let i = 0; i < 12; i++) {
        const year = now.getFullYear(); // 년
        const month = now.getMonth() + 1; // 월
        result.push(`${year}.${month < 10 ? `0${month}` : month}`); // 데이터 삽입

        now.setMonth(now.getMonth() - 1); // now에서 month 값을 하나 줄임
      }

      return result.reverse();
    };

    setMonths(getLast12Months());
  }, []);

  const data = {
    labels: months,
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
    scales: {
      x: {
        min: xRange.min, // 초기 최소값
        max: xRange.max, // 초기 최대값 (6개월만 표시)
      },
    },
    plugins: {
      legend: {
        display: false, // 범례(그래프 이름)를 비활성화
      },
      title: {
        display: true, // 제목을 표시할지 여부
        text: chartTitle, // 제목 텍스트
        font: {
          size: 18, // 제목 폰트 크기
        },
        align: "center", // 제목을 중앙에 정렬
      },
    },
  };

  let touchStartX = 0;

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = event.touches[0].clientX; // 터치 시작 위치 저장
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.touches[0].clientX; // 터치가 끝나는 위치
    if (touchEndX > 390 || touchStartX < 70) return;
    const deltaX = Math.trunc(Math.abs(touchEndX - touchStartX) / 6); // 터치 시작과 끝의 차이
    setXRange((prevRange) => {
      let newMin, newMax;

      if (touchEndX - touchStartX < 0) {
        // 뒤로 이동
        newMin = Math.min(prevRange.min + deltaX, 6);
        newMax = Math.min(prevRange.max + deltaX, 11);
      } else {
        // 앞으로 이동
        newMin = Math.max(prevRange.min - deltaX, 0);
        newMax = Math.max(prevRange.max - deltaX, 5);
      }

      // 값이 실제로 변경된 경우에만 상태 업데이트
      if (newMin !== prevRange.min || newMax !== prevRange.max) {
        return { min: newMin, max: newMax };
      }

      return prevRange; // 값이 변경되지 않았으면 이전 상태 유지
    });
  };

  return (
    <div
      style={{ width: "100%", height: "100%", overflowX: "hidden" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Chart
        ref={chartRef}
        style={{ height: "100%" }}
        type="bar"
        data={data}
        options={options}
      />
    </div>
  );
};

export default MixedChart;
