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
  const getConsumptionData = async () => {
    console.log("first get Data");
    try {
      const response = await axios.post(
        // `https://j11c201.p.ssafy.io/api/moapay/pay/statistics/consumption/${selectedYear}/${selectedMonth}`,
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
  // 처음 렌더링되는 경우 = 데이터가 없음 그렇기에 받아와야함
  useEffect(() => {
    if (consumptionList.length === 0) {
      console.log("첫 렌더링 후 소비 내역 불러오기 ");
      getConsumptionData();
    }
  }, [consumptionList]);

  return (
    <>
      <List consumptionList={consumptionList} />
    </>
  );
};

export default Consumption;
