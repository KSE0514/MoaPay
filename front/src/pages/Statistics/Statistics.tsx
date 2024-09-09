import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Wrapper, Layout, WaveDiv } from "./Statistics.styles";
const Statistics = () => {
  const [isConsultingMode, setIsConsultingMode] = useState<boolean>(false);
  return (
    <>
      {!isConsultingMode ? (
        <Wrapper className="Wrapper">
          <Layout>
            <div className="first-wave"></div>
            <WaveDiv>
              <div className="second-wave"></div>
              <div className="last-wave"></div>
            </WaveDiv>
          </Layout>
          <Outlet />
        </Wrapper>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default Statistics;
