import { useState } from "react";
import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";
import { categoryData } from "../../../store/CardStore";

const Benefits = () => {
  const location = useLocation();
  const [benefitList, setBenefitList] = useState<categoryData[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );
  console.log("혜택 페이지에옹 ", benefitList);
  return (
    <>
      <List consumptionList={benefitList} />
    </>
  );
};
export default Benefits;
