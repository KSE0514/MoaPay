import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopWrapper, Wrapper } from "./Statistics.styles";
import Wave from "../../components/statistics/Wave/Wave";
import Nav from "../../components/statistics/Nav/Nav";
import DonutChart from "../../components/statistics/Chart/DonutChart/DonutChart";
import StatisticDonutChartText from "../../components/statistics/Text/StatisticDonutChartText/StatisticDonutChartText";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import {
  Top,
  Month,
  Info,
  Bottom,
  DropDownIcon,
  NowDate,
  ImageBox,
  TextBox,
} from "./Statistics.styles";
import { PATH } from "../../constants/path";

interface data {
  cateory: string;
  money: number;
  per: number;
}

const Statistics = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const paths = [
    `${PATH.STATISTICS}${PATH.STATISTICS_CONSUMPTION}`,
    `${PATH.STATISTICS}${PATH.STATISTICS_BENEFITS}`,
    `${PATH.STATISTICS}${PATH.STATISTICS_ANALYSIS}`,
    `${PATH.STATISTICS}${PATH.STATISTICS_SAVING}`,
  ];
  //이번 달을 첫 데이터값으로 지정
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}.${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}`
  );
  const [openDropDown, setOpenDropDown] = useState<boolean>(false); //드롭다운 펼치기 여부
  const [closeAnimateClass, setCloseAnimateClass] = useState(false); //드롭다운 접기
  const [iconAnimateClass, setIconAnimateClass] = useState<string>(""); //아이콘 애니메이션 여부
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // 첫 렌더링 체크 플래그
  const [mode, setMode] = useState<string>("Donut");
  const [navPosition, setNavPosition] = useState<string>(
    `calc(calc(100% / 4) * 0)`
  );

  // test data
  const [dataList, setDataList] = useState<data[]>([
    { cateory: "간편결제", money: 50000, per: 2.5 },
    { cateory: "교육", money: 250000, per: 12.5 },
    { cateory: "교통", money: 50000, per: 2.5 },
    { cateory: "마트·편의점", money: 50000, per: 2.5 },
    { cateory: "미용", money: 100000, per: 5.0 },
    { cateory: "보험", money: 50000, per: 2.5 },
    { cateory: "숙박", money: 250000, per: 12.5 },
    { cateory: "생활", money: 50000, per: 2.5 },
    { cateory: "쇼핑", money: 50000, per: 2.5 },
    { cateory: "식비", money: 100000, per: 5.0 },
    { cateory: "연회비", money: 50000, per: 2.5 },
    { cateory: "온라인 쇼핑", money: 250000, per: 12.5 },
    { cateory: "의료", money: 50000, per: 2.5 },
    { cateory: "주거·통신", money: 50000, per: 2.5 },
    { cateory: "자동차", money: 100000, per: 5.0 },
    { cateory: "취미", money: 50000, per: 2.5 },
    { cateory: "카페", money: 250000, per: 12.5 },
    { cateory: "해외", money: 50000, per: 2.5 },
    { cateory: "항공·여행", money: 50000, per: 2.5 },
    { cateory: "ALL", money: 100000, per: 5.0 },
  ]);

  /**
   * 드롭다운 컨트롤 함수
   */
  const OpenDropDown = () => {
    if (openDropDown) {
      setCloseAnimateClass(true);
      setOpenDropDown(false); // 0.5초 후 드롭다운을 닫음
      setTimeout(() => {
        setCloseAnimateClass(false);
      }, 1100);
    } else {
      setOpenDropDown(true);
    }
  };

  /**
   * nav의 값에 따라 컴포넌트 변경
   */
  const changeComponent = (index: number) => {
    setNavPosition(`calc(calc(100% / 4) * ${index})`);
    //데이터 요청받아서 navigate할때 같이 보내줘야함 -> navigator(paths[index],{state:[datalist]]})
    //받을 때는 locationt사용   const location = useLocation();  const data = location.state;
    if (index == 0) {
      setMode("Donut");
      navigator(paths[index], { state: dataList });
    } else if (index == 1) {
      //데이터 요청받아서 navigate할때 같이 보내줘야함 -> navigator(paths[index],{state:[datalist]]})
      //받을 때는 locationt사용   const location = useLocation();  const data = location.state;
      setMode("Donut");
      navigator(paths[index], { state: dataList });
    } else if (index == 2) {
      //또래 비교금액 가져오기
      setMode("BarGraph");
      navigator(paths[index]);
    } else {
      setMode("Ano");
      navigator(paths[index]);
    }
  };

  /**
   * openDropDown값이 변할 때마다 아이콘 애니메이션 실행
   */
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
                <div className="dropdown-btn">
                  <p>{selectedMonth}</p>
                  <div className={iconAnimateClass}>
                    <DropDownIcon
                      onClick={OpenDropDown}
                      icon={openDropDown ? faCaretUp : faCaretDown}
                    />
                  </div>
                </div>
                <ul
                  className={`dropdown-menu ${openDropDown ? "open" : ""}  ${
                    closeAnimateClass ? "close" : ""
                  }`}
                >
                  <li
                    onClick={(e) =>
                      setSelectedMonth(e.currentTarget.textContent || "")
                    }
                  >
                    2024.09
                  </li>
                  <li
                    onClick={(e) =>
                      setSelectedMonth(e.currentTarget.textContent || "")
                    }
                  >
                    2024.08
                  </li>
                  <li
                    onClick={(e) =>
                      setSelectedMonth(e.currentTarget.textContent || "")
                    }
                  >
                    2024.07
                  </li>
                </ul>
              </Month>
              <Info>
                <DonutChart dataList={dataList} />
                <StatisticDonutChartText
                  text={`이번달에는\n200000원\n소비했어요!`}
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
                      ? "/src/assets/image/good-pig.png"
                      : "/src/assets/image/sad-pig.png"
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
