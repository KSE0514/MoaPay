import { useState } from "react";
import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";

interface data {
  cateory: string;
  money: number;
  per: number;
}
const Benefits = () => {
  const location = useLocation();
  const [benefitList, setBenefitList] = useState<data[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );
  return (
    <>
      <List consumptionList={benefitList} />
    </>
  );
};
export default Benefits;
