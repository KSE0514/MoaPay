import { useState } from "react";
import { Benefits, CardInfoRow, Wrapper } from "./CardDetail.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../store/CardStore";

interface Props {
  selectedCard: Card | null;
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
      <h1>{selectedCard?.cardInfo.cardName}</h1>
      <img
        onLoad={(event) => handleImageLoad(event)}
        style={{
          width: rotate ? "343px" : "216px", // 회전 여부에 따라 width와 height 변경
          height: rotate ? "216px" : "343px",
          transform: rotate ? "rotate(90deg)" : "none",
          marginTop: rotate ? "60px" : "none",
          marginBottom: rotate ? "59px" : "none",
        }}
        src={selectedCard?.cardInfo.imageUrl}
      />
      <CardInfoRow>
        <header style={{ marginTop: "78px" }}>
          <div className="line"></div>
          <span>카드종류</span>
          <div className="line"></div>
        </header>
        <div className="value">
          {selectedCard?.cardInfo.cardType == "cred" ? "체크카드" : "신용카드"}
        </div>
      </CardInfoRow>
      <CardInfoRow>
        <header>
          <div className="line"></div>
          <span>연회비</span>
          <div className="line"></div>
        </header>
        <div className="value">
          {selectedCard?.cardInfo.annualFee !== 0
            ? `${selectedCard?.cardInfo.annualFee}원`
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
          {selectedCard?.cardInfo.performance !== 0
            ? `${selectedCard?.cardInfo.performance}원`
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
          {selectedCard?.cardInfo.benefits.map((benefit) => (
            <div>
              <p></p>
              <li>{benefit.benefitDesc}</li>
            </div>
          ))}
        </ul>
      </Benefits>
    </Wrapper>
  );
};

export default CardDetail;
