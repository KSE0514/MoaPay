import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";
import { categoryData } from "../../../store/CardStore";
import axios from "axios";
import { useAuthStore } from "../../../store/AuthStore";

const Benefits = () => {
  const { id, accessToken } = useAuthStore();
  const location = useLocation();
  const [benefitList, setBenefitList] = useState<categoryData[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );
  console.log("혜택 location은 있을까용 >? ", location.state);
  const getBenefitData = async () => {
    try {
      const response = await axios.post(
        // `https://j11c201.p.ssafy.io/api/moapay/pay/statistics/benefit/${selectedYear}/${selectedMonth}`,
        `/api/moapay/pay/statistics/benefit/${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }`,
        {
          memberId: id,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBenefitList(response.data.data.paymentStatistics);
    } catch (e) {
      console.log(e);
    }
  };
  // 처음 렌더링되는 경우에만 데이터 가져오기
  useEffect(() => {
    if (!location.state) {
      getBenefitData(); // location.state가 없을 때만 데이터를 가져옴
    }
  }, [location.state]); // location.state가 변경될 때만 호출
  return (
    <>
      <List consumptionList={benefitList} />
    </>
  );
};
export default Benefits;
