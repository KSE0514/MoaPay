import { useState } from "react";
import { Benefits, Wrapper } from "./CardDetail.styles";

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
  selectedCard: card | null;
}
const CardDetail = ({ selectedCard }: Props) => {
  const [rotate, setRotate] = useState<boolean>();
  // 이미지 로드 시 회전 여부 설정
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = event.currentTarget;
    if (imgElement.naturalWidth > imgElement.naturalHeight) {
      setRotate(() => true);
    }
  };
  return (
    <Wrapper>
      <h1>{selectedCard.name}</h1>
      <img
        onLoad={(event) => handleImageLoad(event)}
        style={{
          width: rotate ? "343px" : "216px", // 회전 여부에 따라 width와 height 변경
          height: rotate ? "216px" : "343px",
          transform: rotate ? "rotate(90deg)" : "none",
          marginTop: rotate ? "60px" : "none",
          marginBottom: rotate ? "59px" : "none",
        }}
        src={selectedCard.image_url}
      />
      <Benefits>
        <header>
          <div className="line"></div>
          <span>혜택상세</span>
          <div className="line"></div>
        </header>
        <ul>
          {selectedCard.benefits.map((benefit) => (
            <div>
              <p></p>
              <li>{benefit.explanation}</li>
            </div>
          ))}
        </ul>
      </Benefits>
    </Wrapper>
  );
};

export default CardDetail;
