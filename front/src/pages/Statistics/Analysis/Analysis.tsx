import { useEffect, useState } from "react";
import { Graph, Switch } from "./Analysis.styles";
import MixedChart from "../../../components/statistics/Chart/BarGraph/BarGraph";
import styled from "styled-components";
const ToggleWrapper = styled.div`
  display: flex;
  justify-content: end;
  position: relative;
  .toggle {
    margin: 20px 10px 20px 0px;
  }
`;

const Input = styled.input`
  opacity: 0;
`;

const Label = styled.label<{ checked: boolean }>`
  width: 140px;
  background: #ffaae7;
  height: 40px;
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  border: 0.5px solid rgba(117, 117, 117, 0.31);
  box-shadow: inset 0px 0px 4px 0px rgba(0, 0, 0, 0.2),
    0 -3px 4px rgba(0, 0, 0, 0.15);

  &:before {
    content: "";
    display: block;
    width: ${(props) => (props.checked ? "35px" : "35px")};
    height: ${(props) => (props.checked ? "35px" : "35px")};
    top: 2.5px;
    left: ${(props) => (props.checked ? "100px" : "0.25em")};
    background: #fff;
    border-radius: 2em;
    box-shadow: inset 0.5px -1px 1px rgba(0, 0, 0, 0.35);
    position: absolute;
    transition: all 0.3s ease;
    transform: ${(props) => (props.checked ? "rotate(0)" : "rotate(-25deg)")};
  }
`;
const Analysis = () => {
  const [consumptionMode, setConsumptionMode] = useState<boolean>(true);
  /**
   * 데이터 타입 : 한달 소비량 / 혜택량
   * [50000,30000,...]
   */
  // const [userDataList, setUserDataList] = useState<number[]>([]);
  // const [avgDataList, setAvgDataList] = useState<number[]>([]);

  //testdata
  const [userDataList, setUserDataList] = useState<number[]>([]);
  const [avgDataList, setAvgDataList] = useState<number[]>([]);
  useEffect(() => {
    if (consumptionMode) {
      //test
      setUserDataList([
        2514623, 2600615, 1326627, 2161812, 3309298, 1833406, 1407476, 2702857,
        2775117, 2186652, 2865847, 2904483,
      ]);
      setAvgDataList([
        2812549, 2698353, 2336442, 2122528, 1707743, 2143653, 2447313, 2748978,
        2891259, 2158323, 2873874, 2967022,
      ]);
      //매달 소비 총액 가져오기
      getMonthlyConsumptionList();
    } else {
      //test
      setUserDataList([
        3500, 5241, 2351, 12321, 11531, 3211, 12157, 7342, 5639, 22212, 12462,
        8534,
      ]);
      setAvgDataList([
        2351, 1536, 3461, 2352, 8584, 5845, 2675, 9752, 1357, 8554, 2356, 7457,
      ]);
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
    <>
      <Graph>
        <MixedChart userDataList={userDataList} avgDataList={avgDataList} />
      </Graph>
      <ToggleWrapper>
        <div className="toggle normal">
          <Input
            type="checkbox"
            id="normal"
            checked={consumptionMode}
            onChange={handleToggle}
          />
          <Label htmlFor="normal" checked={consumptionMode} />
        </div>
      </ToggleWrapper>
    </>
  );
};
export default Analysis;
