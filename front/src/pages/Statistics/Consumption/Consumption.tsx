import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";
import { useEffect, useState } from "react";

interface data {
  cateory: string;
  money: number;
  per: number;
}

const Consumption = () => {
  const location = useLocation();
  const [consumptionList, setConsumptionList] = useState<data[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );

  // 처음 렌더링되는 경우 = 데이터가 없음 그렇기에 받아와야함
  useEffect(() => {
    if (consumptionList.length === 0) {
      setConsumptionList([
        { cateory: "간편결제", money: 50000, per: 2.5 },
        { cateory: "교육", money: 250000, per: 12.5 },
        { cateory: "교통", money: 50000, per: 2.5 },
        { cateory: "마트·편의점", money: 50000, per: 2.5 },
        { cateory: "미용", money: 100000, per: 5.0 },
        { cateory: "보험", money: 50000, per: 2.5 },
        { cateory: "숙박", money: 250000, per: 12.5 },
        { cateory: "생활", money: 50000, per: 2.5 },
        { cateory: "쇼핑", money: 50000, per: 2.5 },
        { cateory: "식비", money: 100000, per: 5.0 },
        { cateory: "연회비", money: 50000, per: 2.5 },
        { cateory: "온라인 쇼핑", money: 250000, per: 12.5 },
        { cateory: "의료", money: 50000, per: 2.5 },
        { cateory: "주거·통신", money: 50000, per: 2.5 },
        { cateory: "자동차", money: 100000, per: 5.0 },
        { cateory: "취미", money: 50000, per: 2.5 },
        { cateory: "카페", money: 250000, per: 12.5 },
        { cateory: "해외", money: 50000, per: 2.5 },
        { cateory: "항공·여행", money: 50000, per: 2.5 },
        { cateory: "ALL", money: 100000, per: 5.0 },
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
