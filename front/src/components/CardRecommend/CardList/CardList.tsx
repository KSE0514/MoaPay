import { useState } from "react";
import { CardInfo } from "./CardList.styles";

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
  // 각 카드별로 이미지 회전 여부를 저장하는 상태
  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({});

  // 이미지가 로드되면 호출되는 핸들러
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    index: number
  ) => {
    const imgElement = event.currentTarget;
    // 이미지의 원래 크기를 비교하여 회전 여부 결정
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate((prevRotate) => ({ ...prevRotate, [index]: true }));
    }
  };

  return (
    <>
      {cardList.map((card, index) => (
        <CardInfo
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
    </>
  );
};

export default CardList;
