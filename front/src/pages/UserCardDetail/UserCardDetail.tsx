import { useState, useEffect } from "react";
import backImg from "./../../assets/image/card_detail_back.png";
import bottomGD from "./../../assets/image/card_detail_bottom.png";
import testCard12 from "./../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png";
import DetailPayLogList from "../../components/card/DetailPayLogList/DetailPayLogList";
import axios from "axios";

import {
  Wrapper,
  BackImg,
  Top,
  Month,
  CardInfo,
  Main,
  Bottom,
} from "./UserCardDetail.styles";

const UserCardDetail = () => {
  // 테스트용 카드 데이터--- 나중에 지울 예정
  const card = {
    img: testCard12,
    name: "올바른 FLEX 카드",
    cur_record: 253200,
    tar_record: 3000000,
    benefit: 5600,
  };

  // 년도와 월을 state로 관리
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(8);
  const [rotate, setRotate] = useState<boolean>(false);

  // 카드별 결제 내역 조회(년, 월)
  const getCardHistory = async () => {
    try{
      const response = await axios.get(
        `요청 api 주소 입력`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          console.log("카드 결제내역 조회 완료");
        }
    }catch (err) {
      console.error("에러 발생", err);
    }
  }

  // 년, 월이 바뀔 때마다 결제내역 조회 요청하기
  useEffect(() => {
    getCardHistory()
  }, [year, month])

  // 월 선택 핸들러 (이전 달)
  const handlePrevMonth = () => {
    if (month === 1) {
      // 1월에서 이전 달로 가면 이전 해의 12월로 이동
      setMonth(12);
      setYear((prevYear) => prevYear - 1);
    } else {
      // 그 외에는 그냥 이전 달로 이동
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  // 월 선택 핸들러 (다음 달)
  const handleNextMonth = () => {
    if (month === 12) {
      // 12월에서 다음 달로 가면 다음 해의 1월로 이동
      setMonth(1);
      setYear((prevYear) => prevYear + 1);
    } else {
      // 그 외에는 그냥 다음 달로 이동
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  // 년도와 월을 선택할 수 있는 함수
  const handleMonthSelect = () => {
    const selectedYear = prompt("년도 입력 (예: 2024)", year.toString());
    const selectedMonth = prompt("월 입력 (1 ~ 12)", month.toString());

    if (selectedYear && !isNaN(Number(selectedYear))) {
      setYear(Number(selectedYear));
    }

    if (selectedMonth && !isNaN(Number(selectedMonth))) {
      const monthNum = Number(selectedMonth);
      if (monthNum >= 1 && monthNum <= 12) {
        setMonth(monthNum);
      } else {
        alert("월은 1과 12 사이여야 합니다.");
      }
    }
  };

  // 카드 가로, 세로 길이에 따른 회전 여부 판단 핸들러
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = event.currentTarget;
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate(true);
    }
  };

  return (
    <Wrapper>
      <BackImg>
        <img src={backImg} />
      </BackImg>
      <Top>
        <Month>
          <button onClick={handlePrevMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
          </button>
          <div onClick={handleMonthSelect}>
            {year}년 {month}월
          </div>
          <button onClick={handleNextMonth}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </Month>
        <CardInfo>
          <img
            src={card.img}
            onLoad={(event) => handleImageLoad(event)}
            style={{
              width: rotate ? "66.5px" : "105px",
              height: rotate ? "105px" : "66.5px",
              transform: rotate ? "rotate(-90deg)" : "none",
              marginLeft: rotate ? "17.5px" : "0",
            }}
          />
          <div>
            <div>{card.name}</div>
            <div>
              실적: {card.cur_record.toLocaleString()} /{" "}
              {card.tar_record.toLocaleString()}
            </div>
            <div>혜택: {card.benefit.toLocaleString()}원</div>
          </div>
        </CardInfo>
      </Top>
      <Main>
        <DetailPayLogList />
      </Main>
      <Bottom>
        <img src={bottomGD} />
      </Bottom>
    </Wrapper>
  );
};

export default UserCardDetail;
