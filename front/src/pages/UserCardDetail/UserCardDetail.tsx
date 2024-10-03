import { useState, useEffect } from "react";
import Modal from "../../components/dutch/Modal/Modal";
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
  DateTag,
  CardInfo,
  Main,
  Bottom,
  DateInput,
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
  const currentYear = new Date().getFullYear();  // 현재 년도 가져오기
  const currentMonth = new Date().getMonth() + 1; // 월은 0부터 시작하기 때문에 +1

  // 년도와 월을 state로 관리
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [rotate, setRotate] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempYear, setTempYear] = useState<number>(year);
  const [tempMonth, setTempMonth] = useState<number>(month);
  const [errorMessage, setErrorMessage] = useState<string>(""); // 오류 메시지 상태


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
    if (year === currentYear && month === currentMonth) {
      // 현재 연도와 월일 경우, 더 이상 다음 달로 이동하지 않도록
      return
    }

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
    setTempYear(year);
    setTempMonth(month);
    setIsOpen(true);
  };

  // 년도 변경
  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempYear(Number(e.target.value))
  }

  // 월 변경
  const onChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMonth(Number(e.target.value))
  }

  const ChangeYearMonth = () => {
    if (tempYear > currentYear || (tempYear === currentYear && tempMonth > currentMonth) || (tempMonth <= 1 || tempMonth >= 12)) {
      setErrorMessage("날짜를 확인 후 다시 입력해주세요.");
    } else {
      // 입력이 유효한 경우 year과 month 업데이트
      setYear(tempYear);
      setMonth(tempMonth);
      setIsOpen(false);
      setErrorMessage(""); // 오류 메시지 초기화
    }
  }

  const onClose = () => {
    setIsOpen(false)
    setErrorMessage(""); // 오류 메시지 초기화
  }

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
          <DateTag onClick={handleMonthSelect}>
            {year !== currentYear && (
              <span>{year}년 </span>
            )}
            <span>
              {month < 10?  `0${month}`: month}월
            </span>
          </DateTag>
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
      {/* <Bottom>
        <img src={bottomGD} />
      </Bottom> */}


      {/* 날짜 변경 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <div
        style={{
          fontSize: "15px",
          paddingTop: '20px',
        }}
        >
          <div
            style={{
              color: 'gray'
            }}
          >
            조회하고자 하는 기간을 입력해주세요.
          </div>
          <DateInput>
            <input type="number" value={tempYear} onChange={onChangeYear} />년
            <input type="number" value={tempMonth} onChange={onChangeMonth}/>월
          </DateInput>
          {errorMessage && <div style={{ color: "red",
            paddingBottom: '15px'
           }}>{errorMessage}</div>}
          <button onClick={ChangeYearMonth}>
            확인
          </button>
        </div>
        
        
      </Modal>
    </Wrapper>
  );
};

export default UserCardDetail;
