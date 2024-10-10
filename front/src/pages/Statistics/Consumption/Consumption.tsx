import { useLocation } from "react-router-dom";
import List from "../../../components/statistics/List/List";
import { useEffect, useState } from "react";
import { categoryData } from "../../../store/CardStore";
import { useAuthStore } from "../../../store/AuthStore";
import axios from "axios";

const Consumption = () => {
  const { id, accessToken } = useAuthStore();
  const location = useLocation();
  const [consumptionList, setConsumptionList] = useState<categoryData[]>(
    location.state || [] // location.state가 없을 때 빈 배열로 초기화
  );
  console.log("소비 location은 있을까용 >? ", consumptionList);
  const getConsumptionData = async () => {
    console.log("first get Data");
    try {
      const response = await axios.post(
        `/api/moapay/pay/statistics/consumption/${new Date().getFullYear()}/${
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
      setConsumptionList(response.data.data.paymentStatistics);
    } catch (e) {
      console.log(e);
    }
  };

  // 처음 렌더링되는 경우에만 데이터 가져오기
  useEffect(() => {
    if (!location.state) {
      getConsumptionData(); // location.state가 없을 때만 데이터를 가져옴
    }
  }, [location.state]); // location.state가 변경될 때만 호출

  console.log("소비 페이지에옹 ", consumptionList);

  return (
    <>
      <List consumptionList={consumptionList} />
    </>
  );
};

export default Consumption;
