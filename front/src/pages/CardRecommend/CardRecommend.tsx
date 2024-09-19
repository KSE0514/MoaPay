import { useEffect, useState } from "react";
import {
  Wrapper,
  Loading,
  Layout,
  CardView,
  ComparisonView,
  ComparisonList,
  Toggle,
} from "./CardRecommend.styles";
import CardList from "../../components/CardRecommend/CardList/CardList";
import { userCardList, RecommendedCardList } from "../../constants/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faX,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
interface benefit {
  category: string;
  explanation: string;
}
interface card {
  name: string; //카드명
  image_url: string; //이미지 url
  type: number; //카드 종류 - 신용, 체크
  annual_fee: number; //연회비
  performance: number; //전월실적
  benefits: benefit[]; //혜택
}
/**
 * 추천받은 카드를 가져올때 정보를 다 가져와서 프론트쪽에서 가지고 있기
 */
const CardRecommend = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [RecommendedCardList, setRecommendedCardList] = useState<card[]>([]);
  // const [userCardInfoList, setUserCardInfoList] = useState<card[]>([]);
  const [comparisonCard, setComparisonCard] = useState<(card | null)[]>([
    null,
    null,
  ]);
  // 각 카드별로 이미지 회전 여부를 저장하는 상태
  const [showComparisonView, setShowComparisonView] = useState<boolean>(false);
  const [showUserCard, setShowUserCard] = useState<boolean>(false);
  const [navPosition, setNavPosition] = useState<string>(
    `calc(calc(100% / 2) * 0)`
  );

  const changeShowComparisonViewState = () => {
    setShowComparisonView((current) => !current);
  };

  const onCardClick = (card: card) => {
    setComparisonCard((prev) => {
      if (prev.length >= 2 && prev[0] && prev[1]) return prev; // 이미 2개의 카드가 선택되었으면 더 추가하지 않음
      //0이 비어 있을 때
      if (!prev[0]) {
        return [card, prev[1]];
      }
      //1이 비어 있을 때
      else {
        return [prev[0], card];
      }
    });
  };

  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({}); // 이미지 회전 여부 저장

  // 이미지 로드 후 크기를 비교하여 회전 여부 결정
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    index: number
  ) => {
    const imgElement = event.currentTarget;
    // 이미지의 naturalWidth와 naturalHeight를 비교하여 회전 여부 설정
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate((prevRotate) => ({ ...prevRotate, [index]: true }));
    }
  };

  const deleteComparisonCard = (index: number) => {
    setComparisonCard((prev) => {
      if (index == 0) return [null, prev[1]];
      else return [prev[0], null];
    });
  };

  useEffect(() => {
    // 추천카드 받아오기 10장 - RecommendedCardList
    // 내 카드에 대한 카드 정보들 가져오기 - userCardInfoList
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading>Loading</Loading>
      ) : (
        <>
          <Layout>
            <div></div>
            <div></div>
            <div></div>
          </Layout>
          <div className="view">
            <CardView>
              <div className="cardimg">
                {comparisonCard[0] ? (
                  <>
                    <img
                      src={comparisonCard[0].image_url}
                      alt={comparisonCard[0].name}
                      onLoad={(event) => handleImageLoad(event, 0)} // 이미지 로드 시 회전 여부 판단
                      style={{
                        width: rotate[0] ? "84px" : "132px", // 회전 여부에 따라 width와 height 변경
                        height: rotate[0] ? "132px" : "84px",
                        transform: rotate[0] ? "rotate(-90deg)" : "none",
                        top: rotate[0] ? "-23px" : "",
                        left: rotate[0] ? "22px" : "",
                      }}
                    />
                    <div
                      className="delete-btn"
                      onClick={() => {
                        deleteComparisonCard(0);
                      }}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </div>
                  </>
                ) : (
                  <img src="\src\assets\image\recommendedcard.png" />
                )}
              </div>
              <div>vs</div>
              <div className="cardimg">
                {comparisonCard[1] ? (
                  <>
                    <img
                      src={comparisonCard[1].image_url}
                      alt={comparisonCard[1].name}
                      onLoad={(event) => handleImageLoad(event, 1)} // 두 번째 카드도 동일하게 적용
                      style={{
                        width: rotate[1] ? "84px" : "132px", // 회전 여부에 따라 width와 height 변경
                        height: rotate[1] ? "132px" : "84px",
                        transform: rotate[1] ? "rotate(-90deg)" : "none",
                        top: rotate[1] ? "-23px" : "",
                        left: rotate[1] ? "22px" : "",
                      }}
                    />
                    <div
                      className="delete-btn"
                      onClick={() => {
                        deleteComparisonCard(1);
                      }}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </div>
                  </>
                ) : (
                  <img src="\src\assets\image\recommendedcard.png" />
                )}
              </div>
            </CardView>
            <ComparisonView>
              <div
                onClick={changeShowComparisonViewState}
                className="comparison-view-header"
              >
                <p>
                  {showComparisonView ? "비교 결과 닫기" : "비교 결과 펼치기"}
                </p>
                {showComparisonView ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
              </div>
              {showComparisonView ? (
                <ComparisonList>
                  {comparisonCard[0] || comparisonCard[1] ? (
                    <>
                      <header>카드종류</header>
                      <div className="row">
                        <p>
                          {comparisonCard[0]
                            ? comparisonCard[0].type == 0
                              ? "체크카드"
                              : "신용카드"
                            : ""}
                        </p>
                        <div className="line"></div>
                        <p>
                          {comparisonCard[1]
                            ? comparisonCard[1].type == 0
                              ? "신용카드"
                              : "체크카드"
                            : ""}
                        </p>
                      </div>
                      <header>연회비</header>
                      <div className="row">
                        <p>
                          {comparisonCard[0]
                            ? comparisonCard[0].annual_fee !== 0
                              ? `${comparisonCard[0].annual_fee}원`
                              : "연회비 없음"
                            : ""}
                        </p>
                        <div className="line"></div>
                        <p>
                          {comparisonCard[1]
                            ? comparisonCard[1].annual_fee !== 0
                              ? `${comparisonCard[1].annual_fee}원`
                              : "연회비 없음"
                            : ""}
                        </p>
                      </div>
                      <header>전월실적</header>
                      <div className="row">
                        <p>
                          {comparisonCard[0]
                            ? comparisonCard[0].performance !== 0
                              ? `${comparisonCard[0].performance}원`
                              : "전월실적 없음"
                            : ""}
                        </p>
                        <div className="line"></div>
                        <p>
                          {comparisonCard[1]
                            ? comparisonCard[1].performance !== 0
                              ? `${comparisonCard[1].performance}원`
                              : "전월실적 없음"
                            : ""}
                        </p>
                      </div>
                      <header>주요혜택</header>
                      <div className="row benefit">
                        <p className="benefit-row">
                          {comparisonCard[0]
                            ? comparisonCard[0].benefits.map(
                                (benefit, index) => (
                                  <>
                                    <p className="benefit-category" key={index}>
                                      {benefit.category}
                                    </p>
                                    <p className="benefit-explanation">
                                      {benefit.explanation}
                                    </p>
                                  </>
                                )
                              )
                            : ""}
                        </p>
                        <div
                          style={{
                            width: "1px",
                            backgroundColor: "#a097ff",
                          }}
                        ></div>
                        <p className="benefit-row">
                          {comparisonCard[1]
                            ? comparisonCard[1].benefits.map(
                                (benefit, index) => (
                                  <>
                                    <p className="benefit-category" key={index}>
                                      {benefit.category}
                                    </p>
                                    <p className="benefit-explanation">
                                      {benefit.explanation}
                                    </p>
                                  </>
                                )
                              )
                            : ""}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="notify">비교할 카드를 골라주세요!</div>
                  )}
                </ComparisonList>
              ) : null}
            </ComparisonView>
            <Toggle>
              <p
                onClick={() => {
                  setNavPosition(`calc(calc(100% / 2) *0)`);
                  setShowUserCard(false);
                }}
              >
                추천카드
              </p>
              <p
                onClick={() => {
                  setNavPosition(`calc(calc(100% / 2) * 1)`);
                  setShowUserCard(true);
                }}
              >
                내카드
              </p>
              <div style={{ left: `${navPosition}` }}></div>
            </Toggle>
            {/* <div className="slide-nofity">밀어서 상세보기</div> */}
            <CardList
              onCardClick={onCardClick}
              cardList={showUserCard ? userCardList : RecommendedCardList}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default CardRecommend;
