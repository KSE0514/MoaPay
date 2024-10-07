import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";
import { useEffect, useState } from "react";
import { categoryData } from "../../../store/CardStore";

const Consumption = () => {
  const location = useLocation();
  const [consumptionList, setConsumptionList] = useState<categoryData[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );

  // 처음 렌더링되는 경우 = 데이터가 없음 그렇기에 받아와야함
  useEffect(() => {
    if (consumptionList.length === 0) {
      console.log("");
    }
  }, [consumptionList]);

  return (
    <>
      <List consumptionList={consumptionList} />
    </>
  );
};

export default Consumption;
