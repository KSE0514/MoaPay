import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopWrapper, Wrapper } from "./Statistics.styles";
import Wave from "../../components/statistics/Wave/Wave";
import Nav from "../../components/statistics/Nav/Nav";
import DonutChart from "../../components/statistics/Chart/DonutChart/DonutChart";
import StatisticDonutChartText from "../../components/statistics/Text/StatisticDonutChartText/StatisticDonutChartText";
import {
  faChevronRight,
  // faCaretDown,
  // faCaretUp,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  Top,
  Month,
  Info,
  Bottom,
  // DropDownIcon,
  NowDate,
  ImageBox,
  TextBox,
} from "./Statistics.styles";
import { PATH } from "../../constants/path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { categoryData } from "../../store/CardStore";
const Statistics = () => {
  /**
   * 드롭다운 컨트롤 함수
   */
  // const OpenDropDown = () => {
  //   if (openDropDown) {
  //     setCloseAnimateClass(true);
  //     setOpenDropDown(false); // 0.5초 후 드롭다운을 닫음
  //     setTimeout(() => {
  //       setCloseAnimateClass(false);
  //     }, 1100);
  //   } else {
  //     setOpenDropDown(true);
  //   }
  // };
  /**
   * openDropDown값이 변할 때마다 아이콘 애니메이션 실행
   */
  // useEffect(() => {
  //   if (isFirstRender) {
  //     // 첫 렌더링일 경우 아무 작업도 하지 않음
  //     setIsFirstRender(false); // 이후 렌더링에는 실행되도록 변경
  //     return;
  //   }
  // 애니메이션 클래스 적용
  // setIconAnimateClass("binggle");

  // 1초 후 애니메이션 클래스 초기화
  // const timer = setTimeout(() => {
  //   setIconAnimateClass("");
  // }, 1000);

  // 타이머 정리
  //   return () => clearTimeout(timer);
  // }, [openDropDown]);

  const navigator = useNavigate();
  const location = useLocation();
  const paths = [
    `${PATH.STATISTICS}${PATH.STATISTICS_CONSUMPTION}`,
    `${PATH.STATISTICS}${PATH.STATISTICS_BENEFITS}`,
    `${PATH.STATISTICS}${PATH.STATISTICS_ANALYSIS}`,
    `${PATH.STATISTICS}${PATH.STATISTICS_SAVING}`,
  ];
  //이번 달을 첫 데이터값으로 지정
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [mode, setMode] = useState<string>("Donut");
  const [navPosition, setNavPosition] = useState<string>(
    `calc(calc(100% / 4) * 0)`
  );
  const [calculatedPrice, setCalculated] = useState<number | null>(null);

  // 카테고리 데이터
  const [dataList, setDataList] = useState<categoryData[] | null>([]);

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedYear((prevYear) => prevYear - 1);
      setSelectedMonth(12);
    } else {
      setSelectedMonth((prevMonth) => prevMonth - 1);
    }
    // 현재페이지에 따라 데이터 새로 가져오기
    if (window.location.pathname == paths[0]) {
      console.log("load consumptionData");
      getConsumptionData();
    } else if (window.location.pathname == paths[1]) {
      console.log("load benefitData");
      getBenefitData();
    }
  };

  const handleNextMonth = () => {
    if (
      selectedYear == new Date().getFullYear() &&
      selectedMonth > new Date().getMonth()
    )
      return;
    if (selectedMonth === 12) {
      setSelectedYear((prevYear) => prevYear + 1);
      setSelectedMonth(1);
    } else {
      setSelectedMonth((prevMonth) => prevMonth + 1);
    }
    //현재페이지에 따라 데이터 새로 가져오기
    if (window.location.pathname == paths[0]) {
      console.log("load consumptionData");
      getConsumptionData();
    } else if (window.location.pathname == paths[1]) {
      console.log("load benefitData");
      getBenefitData();
    }
  };

  /**
   * 특정 달에 대한 소비 데이터 가져오기 - 년도와 월을 보내야함(selectedYear selectedMonth)
   */
  const getConsumptionData = async () => {
    console.log("getConsumtionData");
    // try {
    //   const response = await axios.get(``);
    //   setDataList();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  /**
   * 특정 달에 대한 혜택 데이터 가져오기 - 년도와 월을 보내야함
   */
  const getBenefitData = async () => {
    console.log("getBenefitData");
    // try {
    //   const response = await axios.get(``);
    //   setDataList();
    // } catch (e) {
    //   console.log(e);
    // }
  };

  /**
   * nav의 값에 따라 컴포넌트 변경
   */
  const changeComponent = async (index: number) => {
    setNavPosition(`calc(calc(100% / 4) * ${index})`);
    //데이터 요청받아서 navigate할때 같이 보내줘야함 -> navigator(paths[index],{state:[datalist]]})
    //받을 때는 locationt사용   const location = useLocation();  const data = location.state;
    if (index == 0) {
      setMode("Donut");
      try {
        getConsumptionData();
        navigator(paths[index], { state: dataList });
      } catch (e) {
        console.log(e);
      }
    } else if (index == 1) {
      //데이터 요청받아서 navigate할때 같이 보내줘야함 -> navigator(paths[index],{state:[datalist]]})
      //받을 때는 locationt사용   const location = useLocation();  const data = location.state;
      setMode("Donut");
      try {
        getBenefitData();
        navigator(paths[index], { state: dataList });
      } catch (e) {
        console.log(e);
      }
    } else if (index == 2) {
      //또래 비교금액 가져오기
      setMode("BarGraph");
      navigator(paths[index]);
    } else {
      setMode("Ano");
      navigator(paths[index]);
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    // URL 경로에 맞게 index 값을 설정
    const index = paths.findIndex((path) => path === currentPath);
    console.log("index: " + index);
    if (index !== -1) {
      changeComponent(index); // URL에 맞는 컴포넌트를 렌더링
    }
  }, []);

  return (
    <>
      <Wrapper className="Wrapper">
        <Wave />
        <Top className="Top">
          {mode === "Donut" && (
            <>
              <Month>
                {/* <div className="dropdown-btn"> */}
                <div className="month">
                  <div onClick={handlePrevMonth}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                  <p>{`${selectedYear}.${String(selectedMonth).padStart(
                    2,
                    "0"
                  )}`}</p>
                  <div onClick={handleNextMonth}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </div>
              </Month>
              <Info>
                <DonutChart dataList={dataList} />
                <StatisticDonutChartText
                  text={`${selectedMonth}월에는\n${calculatedPrice}원\n소비했어요!`}
                />
              </Info>
            </>
          )}
          {mode === "BarGraph" && (
            <TopWrapper>
              <NowDate>{`${new Date().getFullYear()}년 ${String(
                new Date().getMonth() + 1
              )}월엔...`}</NowDate>
              <ImageBox>
                <img
                  src={
                    true
                      ? "/assets/image/good-pig.png"
                      : "/assets/image/sad-pig.png"
                  }
                ></img>
              </ImageBox>
              <TextBox>
                {"또래 남성에 비해 50,000원 덜 쓰고,\n34,200원의 혜택을 누렸어요!"
                  .split("\n")
                  .map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </TextBox>
            </TopWrapper>
          )}
          {mode === "Ano" && (
            <div className="saving">
              <p className="title">1월 목표 중 남은 금액</p>
              <div className="price">
                <p>123,200원</p>
                <p>/</p>
                <p>800,000원</p>
              </div>
              <div className="sub">
                <div>
                  <img src="/assets/image/prinrefacezoom.png" />
                  <p>
                    목표 금액의 <span style={{ color: "red " }}>84%</span>
                    를 썼어요.
                    <br />
                    앞으로 하루{" "}
                    <span style={{ color: "#4258ff " }}>30,800원</span>만 쓰면
                    돼요.
                  </p>
                </div>
              </div>
            </div>
          )}
        </Top>
        <Bottom className="Bottom">
          <Nav navPosition={navPosition} changeComponent={changeComponent} />
          <Outlet />
        </Bottom>
      </Wrapper>
    </>
  );
};
export default Statistics;
