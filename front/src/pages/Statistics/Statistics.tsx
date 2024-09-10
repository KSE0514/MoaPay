import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Wrapper } from "./Statistics.styles";
import Wave from "../../components/statistics/Wave/Wave";
const Statistics = () => {
  const [isConsultingMode, setIsConsultingMode] = useState<boolean>(false);
  return (
    <>
      {!isConsultingMode ? (
        <Wrapper className="Wrapper">
          <Wave />
          <Outlet />
        </Wrapper>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default Statistics;
