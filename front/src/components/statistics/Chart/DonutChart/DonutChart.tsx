import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Chart.js에서 사용할 요소를 등록
ChartJS.register(ArcElement, Tooltip, Legend, Title);
interface data {
  cateory: string;
  money: number;
  per: number;
}

interface Props {
  dataList: data[]; // props로 받을 데이터 타입 지정
}
const DonutChart = ({dataList}:Props) => {
  const sortedDataList = [...dataList].sort((a, b) => b.per - a.per);

  // sortedDataList에서 레이블과 데이터 추출
  const labels = sortedDataList.map((item) => item.cateory);
  const values = sortedDataList.map((item) => item.money);
  const data = {
    labels: labels,
    datasets: [
      {
        data:values,
        backgroundColor: [
"rgba(255, 99, 132, 1)",    // 밝은 핑크 (기본 차트 색상 중 하나)
"#4457ff",   // 라일락 (보라 계열)
"rgba(255, 159, 64, 1)",    // 오렌지 톤
"rgba(75, 192, 192, 1)",    // 민트 그린
"rgba(255, 205, 86, 1)",    // 파스텔 옐로우
"rgba(54, 162, 235, 1)"     // 파란색

        ],
        borderColor: [
"rgba(255, 99, 132, 1)",    // 밝은 핑크 (기본 차트 색상 중 하나)
"#4457ff",      // 라일락 (보라 계열)
"rgba(255, 159, 64, 1)",    // 오렌지 톤
"rgba(75, 192, 192, 1)",    // 민트 그린
"rgba(255, 205, 86, 1)",    // 파스텔 옐로우
"rgba(54, 162, 235, 1)"     // 파란색

        ],
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
         display: false, // 범례를 비활성화하여 상단 설명을 숨김
        // position: "top" as const, // 범례 위치 설정 (top, bottom, left, right)
      },
      // title: {
      //   display: true,
      //   text: "Sample Doughnut Chart", // 차트 제목
      //   font: {
      //     size: 18, // 제목의 폰트 크기
      //   },
      // },
    },
  };
    
  return(
  <div style={{ width: "180px", height: "180px" }}>
      <Doughnut data={data} options={options} />
    </div>);
};

export default DonutChart;
