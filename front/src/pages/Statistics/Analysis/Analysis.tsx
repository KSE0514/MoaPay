import { useEffect, useState } from "react";
import { Graph, Wrapper } from "./Analysis.styles";
import MixedChart from "../../../components/statistics/Chart/BarGraph/BarGraph";
import Toggle from "../../../../src/components/statistics/Toggle/Toggle";

const Analysis = () => {
  const [consumptionMode, setConsumptionMode] = useState<boolean>(true);
  /**
   * 데이터 타입 : 한달 소비량 / 혜택량
   * [50000,30000,...]
   */
  // const [userDataList, setUserDataList] = useState<number[]>([]);
  // const [avgDataList, setAvgDataList] = useState<number[]>([]);

  //testdata
  const [userDataList, setUserDataList] = useState<number[] | null>([]);
  const [avgDataList, setAvgDataList] = useState<number[] | null>([]);
  useEffect(() => {
    if (consumptionMode) {
      //test
      // setUserDataList([
      //   2514623, 2600615, 1326627, 2161812, 3309298, 1833406, 1407476, 2702857,
      //   2775117, 2186652, 2865847, 2904483,
      // ]);
      // setAvgDataList([
      //   2812549, 2698353, 2336442, 2122528, 1707743, 2143653, 2447313, 2748978,
      //   2891259, 2158323, 2873874, 2967022,
      // ]);
      //매달 소비 총액 가져오기
      getMonthlyConsumptionList();
    } else {
      //test
      // setUserDataList([
      //   3500, 5241, 2351, 12321, 11531, 3211, 12157, 7342, 5639, 22212, 12462,
      //   8534,
      // ]);
      // setAvgDataList([
      //   2351, 1536, 3461, 2352, 8584, 5845, 2675, 9752, 1357, 8554, 2356, 7457,
      // ]);
      //매달 혜택 총액 가져오기
      getMonthlyBenefitList();
    }
  }, [consumptionMode]);
  const getMonthlyConsumptionList = () => {};
  const getMonthlyBenefitList = () => {};
  const handleToggle = () => {
    setConsumptionMode((current) => !current);
  };
  return (
    <Wrapper>
      <Graph>
        <MixedChart
          consumptionMode={consumptionMode}
          userDataList={userDataList}
          avgDataList={avgDataList}
        />
      </Graph>
      <Toggle consumptionMode={consumptionMode} handleToggle={handleToggle} />
    </Wrapper>
  );
};
export default Analysis;
