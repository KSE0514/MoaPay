import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Wrapper,
  Layout,
  Top,
  Bottom,
  Month,
  Nav,
  Circle,
  Text,
} from "./Statistics.styles";
const Statistics = () => {
  const [isConsultingMode, setIsConsultingMode] = useState<boolean>(false);
  const [month, setMonth] = useState<string>();
  return (
    <>
      {isConsultingMode ? (
        <Wrapper>
          <Layout>
            <div></div>
            <div></div>
            <div></div>
          </Layout>
          <Top>
            <Month></Month>
            <div>
              <Circle></Circle>
              <Text></Text>
            </div>
          </Top>
          <Bottom>
            <Nav></Nav>
            <Outlet />
          </Bottom>
        </Wrapper>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default Statistics;
