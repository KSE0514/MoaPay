import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";
import { useEffect, useState } from "react";

interface data {
  img: string;
  cateory: string;
  money: number;
  per: number;
}

const Consumption = () => {
  const location = useLocation();
  const [consumptionList, setConsumptionList] = useState<data[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );

  useEffect(() => {
    if (consumptionList.length === 0) {
      // 처음 렌더링되는 경우 = 데이터가 없음 그렇기에 받아와야함
      setConsumptionList([
        { img: "", cateory: "미용", money: 50000, per: 10 },
        { img: "", cateory: "식비", money: 250000, per: 50 },
        { img: "", cateory: "교통", money: 50000, per: 10 },
        { img: "", cateory: "주거·통신", money: 50000, per: 10 },
        { img: "", cateory: "의료", money: 100000, per: 20 },
      ]);
    }
  }, [consumptionList]);

  return (
    <>
      <List consumptionList={consumptionList} />
    </>
  );
};

export default Consumption;
