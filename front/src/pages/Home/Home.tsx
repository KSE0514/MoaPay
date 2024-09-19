import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Top,
  Bottom,
  BarcordArea,
  Barcord,
  Time,
  ButtonArea,
  Wrapper,
  CardList,
  PlusIcon,
} from "./Home.styles";
import barcode from "../../assets/image/barcode.png";
import { useRef, useState, useEffect } from "react";
const Home = () => {
  const [cardList, setCardList] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  let startY = 0;

  // 터치 시작 시 Y 좌표를 기록
  const handleTouchStart = (e: React.TouchEvent) => {
    startY = e.touches[0].clientY;
  };

  // 터치가 끝났을 때 상하 스와이프 방향을 계산
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (deltaY > 30) {
      // 아래에서 위로 스와이프한 경우 -> 슬라이드를 위로 이동
      handleSlideUp();
    } else if (deltaY < -30) {
      // 위에서 아래로 스와이프한 경우 -> 슬라이드를 아래로 이동
      handleSlideDown();
    }
  };

  // 마지막 카드를 첫 번째로 이동 (위로 스와이프)
  const handleSlideUp = () => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".card");
      if (cards.length > 0) {
        containerRef.current.append(cards[0]);
      }
    }
  };

  // 첫 번째 카드를 마지막으로 이동 (아래로 스와이프)
  const handleSlideDown = () => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".card");
      if (cards.length > 0) {
        containerRef.current.prepend(cards[cards.length - 1]);
      }
    }
  };

  //카드 정보 받아오기
  useEffect(() => {
    setCardList([
      "null",
      "/assets/image/card.png",
      "/assets/image/cards/신용카드이미지/100_신한카드_Air_One.png",
      "/assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png",
    ]);
  }, []);
  return (
    <Wrapper>
      <Top>
        <BarcordArea>
          <Barcord>
            <img src={barcode} alt="barcode" />
          </Barcord>
          <Time>
            <div>2:04</div>
            <button>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </Time>
        </BarcordArea>
        <ButtonArea>
          <button>QR 인식하기</button>
          <button>결제코드 입력하기</button>
        </ButtonArea>
      </Top>
      <Bottom>
        <div className="edit-card">
          <FontAwesomeIcon icon={faBars} />
          <p>편집</p>
        </div>
        <CardList>
          <div
            className="container"
            ref={containerRef}
            onTouchStart={handleTouchStart} // 터치 시작 이벤트 처리
            onTouchEnd={handleTouchEnd} // 터치 종료 이벤트 처리
          >
            {cardList.map((card, index) =>
              card == "null" ? (
                <div className="card add-card">
                  <div>
                    <PlusIcon icon={faPlus} />
                  </div>
                  <p>카드 등록하기</p>
                </div>
              ) : (
                <div className="card">
                  <img src={card} />
                </div>
              )
            )}
          </div>
        </CardList>
        <div className="remaining-performance">다음 실적까지 100,000원</div>
        <div className="tri tri-left"></div>
        <div className="tri tri-right"></div>
      </Bottom>
    </Wrapper>
  );
};
export default Home;
