import { useState } from "react";
import { CardInfo } from "./CardList.styles";
import CardDetail from "../CardDetail/CardDetail";

interface benefit {
  category: string;
  explanation: string;
}

interface card {
  name: string; // 카드명
  image_url: string; // 이미지 url
  type: number; // 카드 종류 - 신용, 체크
  annual_fee: number; // 연회비
  performance: number; // 전월 실적
  benefits: benefit[]; // 혜택
}

interface Props {
  cardList: card[];
  onCardClick: (card: card) => void;
}

const CardList = ({ cardList, onCardClick }: Props) => {
  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({});
  const [translateX, setTranslateX] = useState<{ [key: number]: number }>({});
  const [startX, setStartX] = useState<number | null>(null); // 터치 시작 위치 저장
  const [showCardDetail, setShowCardDetail] = useState<boolean>(false); // 새로운 화면 표시 여부
  const [selectedCard, setSelectedCard] = useState<card | null>(null);

  // 이미지 로드 시 회전 여부 설정
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    index: number
  ) => {
    const imgElement = event.currentTarget;
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate((prevRotate) => ({ ...prevRotate, [index]: true }));
    }
  };

  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    setStartX(e.touches[0].clientX); // 터치 시작 X 좌표 기록
  };

  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    if (startX !== null) {
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX; // 터치 이동 거리 계산 (오른쪽에서 왼쪽으로 이동)
      setTranslateX((prev) => ({ ...prev, [index]: diffX }));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, index: number) => {
    if (startX !== null) {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX; // 실제 이동 거리 계산
      if (Math.abs(diffX) > 300) {
        // 이동 거리가 100px 이상일 때만 새로운 화면을 표시
        setShowCardDetail(true);
        setSelectedCard(cardList[index]);
      }
      // 카드가 원래 위치로 복귀
      setTranslateX((prev) => ({ ...prev, [index]: 0 }));
    }

    // 터치 시작 위치 초기화
    setStartX(null);
  };

  return (
    <>
      {cardList.map((card, index) => (
        <CardInfo
          onTouchStart={(e) => handleTouchStart(e, index)}
          onTouchMove={(e) => handleTouchMove(e, index)}
          onTouchEnd={(e) => handleTouchEnd(e, index)}
          style={{
            transform: `translateX(-${translateX[index] || 0}px)`, // 오른쪽에서 왼쪽으로 이동
            transition: "transform 0.3s ease", // 부드러운 이동 애니메이션
          }}
          className={index === 0 ? "active" : ""}
          onClick={() => onCardClick(card)}
          key={index}
          rotate={rotate[index]}>
          {/* 회전 여부에 따라 스타일을 적용 */}
          <div>
            <img
              src={card.image_url}
              alt={card.name}
              onLoad={(event) => handleImageLoad(event, index)} // 이미지가 로드되면 handleImageLoad 호출
              style={{
                width: rotate[index] ? "57px" : "90px", // 회전 여부에 따라 width와 height 변경
                height: rotate[index] ? "90px" : "57px",
                transform: rotate[index] ? "rotate(-90deg)" : "none",
                marginLeft: rotate[index] ? "17.5px" : "0",
              }}
            />
          </div>
          <h3>{card.name}</h3> {/* 카드명 */}
        </CardInfo>
      ))}

      {/* 새로운 화면 표시 */}
      {showCardDetail && (
        <>
          <CardDetail selectedCard={selectedCard} />
        </>
      )}
    </>
  );
};

export default CardList;
