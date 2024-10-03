import { useState } from "react";

import testcard1 from "./../../../assets/image/cards/신용카드이미지/14_JADE_Classic.png";
import testcard2 from "./../../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png";
import testcard3 from "./../../../assets/image/cards/신용카드이미지/11_삼성_iD_SIMPLE_카드.png";

import {
  Wrapper,
  Card,
} from "./SelectCardList.styles"

const SelectCardList = ({onSelectCard}) => {
  const cardListData = [
    {
      id: 0,
      name: "JADE Classic",
      img: testcard1,
    },
    {
      id: 1,
      name: "올바른 FLEX 카드",
      img: testcard2,
    },
    {
      id: 2,
      name: "삼성 iD SIMPLE 카드",
      img: testcard3,
    },
    {
      id: 3,
      name: "삼성 iD SIMPLE 카드",
      img: testcard3,
    },
    {
      id: 4,
      name: "삼성 iD SIMPLE 카드",
      img: testcard3,
    },
  ];
  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({});


    // 카드 가로, 세로 길이에 따른 회전 여부 판단 핸들러
    const handleImageLoad = (
      event: React.SyntheticEvent<HTMLImageElement, Event>,
      index: number
    ) => {
      const imgElement = event.currentTarget;
      if (imgElement.naturalWidth < imgElement.naturalHeight) {
        setRotate((prevRotate) => ({ ...prevRotate, [index]: true }));
      }
    };

  return (
    <Wrapper>

        {cardListData.map((card, index) => (
          <div key={card.id}>
            <Card
              key={index}
              onClick={() => onSelectCard(card)}
            >
              <div>
                <img
                  src={card.img}
                  alt={card.name}
                  onLoad={(event) => handleImageLoad(event, index)} // 이미지가 로드되면 handleImageLoad 호출
                  style={{
                    position: "absolute",
                    // 19 30 38 60 9.5 15 47.5 75
                    width: rotate[index] ? "47.5px" : "75px", // 회전 여부에 따라 width와 height 변경
                    height: rotate[index] ? "75px" : "47.5px",
                    transform: rotate[index] ? "rotate(-90deg)" : "none", // 회전시키기
                    marginLeft: rotate[index] ? "14px" : "0",
                    userSelect: "none", // 드래그 방지
                  }}
                  draggable="false" // 이미지 드래그 방지
                />
                <div>{card.name}</div>
              </div>
            </Card>
          </div>
        ))}
    </Wrapper>
  )
}

export default SelectCardList;