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

  // 차트 데이터 설정
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

  // 차트 옵션 설정
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

  // 터치 이벤트를 처리하는 변수
  let touchStartX = 0;

  // 터치 시작 시 호출
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX = event.touches[0].clientX; // 터치 시작 위치 저장
  };

  // 터치 이동 시 호출
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.touches[0].clientX; // 터치가 끝나는 위치
    if (touchEndX > 390 || touchStartX < 70) return;
    console.log("start: " + touchStartX + " end" + touchEndX);
    const deltaX = Math.trunc(Math.abs(touchEndX - touchStartX) / 6); // 터치 시작과 끝의 차이
    setXRange((prevRange) => {
      console.log("deltaX " + deltaX);
      if (touchEndX - touchStartX < 0) {
        console.log("뒤로 이동")
        if(prevRange.max+deltaX>11||prevRange.min+deltaX>6){
          const newMin = 6;
          const newMax = 11;
          return { min: newMin, max: newMax };
        }
        else{
          const newMin = prevRange.min+deltaX;
          const newMax = prevRange.max+deltaX;
          return { min: newMin, max: newMax };
        }
      } else {
        console.log("앞으로 이동")
        if(prevRange.max-deltaX<5||prevRange.min-deltaX<0){
          const newMin = 0;
          const newMax = 5;
          return { min: newMin, max: newMax };
        }
        else{
          const newMin = prevRange.min-deltaX;
          const newMax = prevRange.max-deltaX;
          return { min: newMin, max: newMax };
        }
      }
    });
};

  return (
    <div
      style={{ width: "100%", height: "100%", overflowX: "hidden" }}
      onTouchStart={handleTouchStart} // 터치 시작
      onTouchMove={handleTouchMove} // 터치 이동
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
