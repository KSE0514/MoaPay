import { useState } from "react";
import { Benefits, CardInfoRow, Wrapper } from "./CardDetail.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
  closeCardDetail: () => void;
}
const CardDetail = ({ selectedCard, closeCardDetail }: Props) => {
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
      <div className="delete-btn" onClick={closeCardDetail}>
        <FontAwesomeIcon
          style={{ width: "100%", height: "100%" }}
          icon={faXmark}
        />
      </div>
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
      <CardInfoRow>
        <header style={{ marginTop: "78px" }}>
          <div className="line"></div>
          <span>카드종류</span>
          <div className="line"></div>
        </header>
        <div className="value">
          {selectedCard?.type == 0 ? "체크카드" : "신용카드"}
        </div>
      </CardInfoRow>
      <CardInfoRow>
        <header>
          <div className="line"></div>
          <span>연회비</span>
          <div className="line"></div>
        </header>
        <div className="value">
          {selectedCard?.annual_fee !== 0
            ? `${selectedCard?.annual_fee}원`
            : "연회비 없음"}
        </div>
      </CardInfoRow>
      <CardInfoRow>
        <header>
          <div className="line"></div>
          <span>전월실적</span>
          <div className="line"></div>
        </header>
        <div className="value">
          {selectedCard?.performance !== 0
            ? `${selectedCard?.performance}원`
            : "전월실적 없음"}
        </div>
      </CardInfoRow>
      <Benefits>
        <header>
          <div className="line"></div>
          <span>혜택상세</span>
          <div className="line"></div>
        </header>
        <ul>
          {selectedCard?.benefits.map((benefit) => (
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
