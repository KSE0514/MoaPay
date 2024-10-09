import React, { useEffect, useState } from "react";
import { Wrapper, AniView, Ment } from "./CardLoading.styles";
import { useAuthStore } from "../../store/AuthStore";

const CardLoading: React.FC = () => {
  const { name } = useAuthStore();
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    const animateCards = () => {
      setActiveCard(1); // 첫 번째 카드 시작
      setTimeout(() => {
        setActiveCard(2); // 두 번째 카드가 첫 번째 카드 애니메이션 끝나기 0.5초 전에 시작
      }, 500); // 첫 번째 카드 애니메이션 중간쯤 시작
      setTimeout(() => {
        setActiveCard(3); // 세 번째 카드가 두 번째 카드 애니메이션 끝나기 0.5초 전에 시작
      }, 1500); // 두 번째 카드 애니메이션 중간쯤 시작
    };

    const interval = setInterval(() => {
      animateCards(); // 주기적으로 애니메이션 반복
    }, 4000); // 각 애니메이션의 총 길이가 1.5초이므로 3초 간격으로 설정

    animateCards(); // 초기 애니메이션 시작

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Ment>
        {name}님의 소비패턴에 맞는
        <br />
        카드를 추천해드릴게요
      </Ment>
      <AniView>
        <div className="CardList">
          <div
            className={`card card1 magictime spaceInDown ${
              activeCard === 1 ? "active" : ""
            }`}
            style={{
              animationDuration: "1.5s", // 애니메이션 지속시간을 1.5초로 설정
              display: activeCard === 1 ? "block" : "none",
            }}
          >
            <img src="/assets/image/slide-card.png" alt="Card 1" />
          </div>
          <div
            className={`card card2 magictime spaceInDown ${
              activeCard === 2 ? "active" : ""
            }`}
            style={{
              animationDuration: "1.5s", // 애니메이션 지속시간을 1.5초로 설정
              display: activeCard === 2 ? "block" : "none",
            }}
          >
            <img src="/assets/image/slide-card2.png" alt="Card 2" />
          </div>
          <div
            className={`card card3 magictime spaceInDown ${
              activeCard === 3 ? "active" : ""
            }`}
            style={{
              animationDuration: "1.5s", // 애니메이션 지속시간을 1.5초로 설정
              display: activeCard === 3 ? "block" : "none",
            }}
          >
            <img src="/assets/image/slide-card3.png" alt="Card 3" />
          </div>
        </div>
      </AniView>
    </Wrapper>
  );
};

export default CardLoading;
