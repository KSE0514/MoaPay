import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Top, Bottom, Month, Nav, Circle, Text, DropDownIcon,Info } from "./Consumption.styles";

const Consumption = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(`${new Date().getFullYear()}.${String(new Date().getMonth() + 1).padStart(2, '0')}`); //이번 달을 첫 데이터값으로 지정
  const [openDropDown, setOpenDropDown] = useState<boolean>(false); //드롭다운 펼치기 여부
  const [closeAnimateClass,setCloseAnimateClass] = useState(false); //드롭다운 접기
  const [iconAnimateClass, setIconAnimateClass] = useState<string>(""); //아이콘 애니메이션 여부
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // 첫 렌더링 체크 플래그
  const [money,setMoney] = useState<string>("100,000");

  const OpenDropDown = () => {
    if (openDropDown) {
      setCloseAnimateClass(true);
      setOpenDropDown(false);  // 0.5초 후 드롭다운을 닫음
      setTimeout(() => {
        setCloseAnimateClass(false);
      }, 1100);
    } else {
      setOpenDropDown(true);
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      // 첫 렌더링일 경우 아무 작업도 하지 않음
      setIsFirstRender(false); // 이후 렌더링에는 실행되도록 변경
      return;
    }
    // 애니메이션 클래스 적용
    setIconAnimateClass("binggle");

    // 1초 후 애니메이션 클래스 초기화
    const timer = setTimeout(() => {
      setIconAnimateClass("");
    }, 1000);

    // 타이머 정리
    return () => clearTimeout(timer);
  }, [openDropDown]);

  return (
    <>
      <Top>
        <Month onClick={OpenDropDown}>
          <div className="dropdown-btn">
            <p>{selectedMonth}</p>
            {/* 애니메이션 클래스 적용 */}
            <div className={iconAnimateClass}>
              <DropDownIcon icon={openDropDown ? faCaretUp : faCaretDown} />
            </div>
          </div>
             <ul className={`dropdown-menu ${openDropDown ? "open" :""}  ${closeAnimateClass ? "close" :""}`}>
              {/* 데이터가 존재하는 월만 출력? 아니면 모든 월을 출력하는 대신 데이터가 없으면 데이터가 존재하지않는다고 표현? */}
                <li>2024.09</li>
                <li>2024.08</li>
                <li>2024.07</li>
            </ul>
        </Month>
        <Info>
          <Circle></Circle>
          <Text>          
            {`이번달에는\n${money}원\n소비했어요!`.split("\n").map((line, index) => (
              <div>
                {line}
                <br />
              </div>
          ))}</Text>
        </Info>
      </Top>
      <Bottom>
        <Nav>
          <li>결제 내역</li>
          <li>혜택</li>
          <li>통계</li>
          <li>절약</li>
        </Nav>
      </Bottom>
    </>
  );
};

export default Consumption;
