import { useEffect, useState } from "react";
import { Button, Title, Wrapper } from "./BringCard.styles";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAuthStore } from "../../store/AuthStore";
import { useCardStore } from "../../store/CardStore";
import {
  Btn,
  Card,
  CardBackground,
  EditMode,
  Main,
  Top,
} from "../UserCardList/UserCardList.styles";
import Modal from "../../components/dutch/Modal/Modal";
import { MyCardList } from "../../constants/card";

const BringCard = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const baseUrl1 = `http://localhost:18100/`;
  const { cardList, setCardList, removeCard } = useCardStore();
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [before, setBefore] = useState(true);
  const { name, accessToken, mode, setMode } = useAuthStore();
  const bringCard = async () => {
    setIsLoding(true);
    //카드 데이터 가져오기
    try {
      //   const response = await axios.get(`${baseUrl1}moapay/core/card/mycard`, {
      //     withCredentials: true,
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   });
      //   // 로딩상태 풀고 카드 선택 뷰 보이도록 설정
      //   // setCardList(response.data);
      //   console.log(response);

      //Test
      // setCardList(MyCardList);
      //추가
      setIsLoding(false);
      setBefore(false);
    } catch (e) {
      const error = e as AxiosError; // AxiosError로 타입 단언
      console.log(error);
    }
  };

  const settingCard = () => {
    //카드 등록 요청 보내기
    // await axios.post(``, { cardList });
    if (mode === "Join") {
      setMode("");
    }
    if (mode === "NewLogin") {
      setMode("");
    }
    navigate(PATH.HOME);
  };

  //////////////////////////////////////////////////////////////
  const deleteCard = async () => {
    removeCard(0);
    closeModal();
  };

  const [isOpen, setIsOpen] = useState(false); // 더치페이 나가기 모달 상태 관리
  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({});
  const [swipeDistance, setSwipeDistance] = useState<{ [key: number]: number }>(
    {}
  ); // {key(index): key번째 카드가 왼쪽으로 밀린 거리}

  const [startX, setStartX] = useState(0); // 터치 시작의 X 좌표를 저장
  const [swipeCard, setSwipeCard] = useState<number | null>(null); // 스와이프 된 카드의 index 값을 저장
  const [editMode, setEditMode] = useState(false); // 선택 삭제 모드
  const [selectedCards, setSelectedCards] = useState<number[]>([]); // 선택된 카드 목록
  const [longPressTimeout, setLongPressTimeout] =
    useState<NodeJS.Timeout | null>(null); // 긴 터치를 위한 타이머

  const closeModal = () => {
    setSwipeCard(null); // 모달에 전달됐던 카드 index값 다시 비우기
    setIsOpen(false);
  };

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

  // 터치 시작 시 startX에 X좌표 저장
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0]; // 첫 번째 터치 이벤트
    setStartX(touch.clientX);

    // 5초 이상 길게 눌렀을 때 수정 모드 활성화 및 해당 카드 선택
    const timeoutId = setTimeout(() => {
      setEditMode(true); // 수정 모드로 전환
      if (!selectedCards.includes(index)) {
        setSelectedCards((prev) => [...prev, index]); // 해당 카드를 선택
      }
    }, 1100); // 500ms 이상 길게 누르면 수정 모드로 전환
    setLongPressTimeout(timeoutId); // 타이머 설정
    setSwipeDistance((prev) => ({ ...prev, [index]: 0 }));
  };

  // 터치 이동 시 카드를 이동시키는 동작 (터치 이동 처리 함수 추가)
  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0]; // 첫 번째 터치 이벤트
    const moveX = touch.clientX;

    // 스와이프 거리 계산 (시작점 - 현재 위치)
    const deltaX = startX - moveX;

    if (deltaX > 0) {
      // 왼쪽으로 이동한 경우
      setSwipeDistance((prev) => ({ ...prev, [index]: deltaX }));
    }
  };

  // 터치 끝났을 때 처리
  const handleTouchEnd = (index: number) => {
    // 터치가 끝나면 타이머를 취소하여 짧은 터치에서는 수정 모드로 진입하지 않게 함
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
    }

    if (swipeDistance[index] >= 100) {
      console.log(cardList[index].cardInfo.cardName); // 100px 이상 밀렸을 경우 카드 이름 출력
      if (!editMode) {
        setSwipeCard(index);
      }
    }

    // 스와이프가 끝나면 초기화
    setSwipeDistance((prev) => ({ ...prev, [index]: 0 }));
  };

  useEffect(() => {
    if (swipeCard !== null) {
      console.log("삭제되어야 할 카드 인덱스", swipeCard);
      setIsOpen(true);
    }
  }, [swipeCard]);

  // 카드 클릭 시 선택/해제 처리
  const toggleCardSelection = (index: number) => {
    if (selectedCards.includes(index)) {
      // 이미 선택된 카드라면 선택 해제
      setSelectedCards((prev) =>
        prev.filter((cardIndex) => cardIndex !== index)
      );
    } else {
      // 선택되지 않은 카드라면 선택
      setSelectedCards((prev) => [...prev, index]);
    }
  };

  return (
    <Wrapper>
      {isLoding ? (
        <>{before ? <div>Loding...</div> : <div>등록완료되었습니다.</div>}</>
      ) : (
        <>
          {before ? (
            <>
              <Title>카드를 불러오겠습니까?</Title>
              <Button onClick={bringCard}>불러오기</Button>
            </>
          ) : (
            <>
              <Top>불러온 카드 목록</Top>
              <Main>
                {editMode ? (
                  <EditMode>
                    <div>전체 선택</div>
                    <div>삭제</div>
                  </EditMode>
                ) : null}
                {cardList.map((card, index) => (
                  <div key={card.cardInfo.cardName}>
                    <Card
                      key={index}
                      onTouchStart={(e) => handleTouchStart(e, index)}
                      onTouchMove={(e) => handleTouchMove(e, index)} // 추가된 handleTouchMove 함수 사용
                      onTouchEnd={() => handleTouchEnd(index)}
                      onClick={() => editMode && toggleCardSelection(index)} // 수정 모드일 때 카드 선택/해제
                      style={{
                        transform: editMode
                          ? "none"
                          : `translateX(-${swipeDistance[index] || 0}px)`,
                        backgroundColor: "white",
                      }}
                    >
                      {editMode ? (
                        <input
                          type="radio"
                          checked={selectedCards.includes(index)}
                          onChange={() => toggleCardSelection(index)}
                        />
                      ) : null}
                      <div
                        style={{
                          paddingLeft: editMode ? "15px" : "none",
                        }}
                      >
                        <img
                          src={card.cardInfo.imageUrl}
                          alt={card.cardInfo.cardName}
                          onLoad={(event) => handleImageLoad(event, index)} // 이미지가 로드되면 handleImageLoad 호출
                          style={{
                            position: "absolute",
                            width: rotate[index] ? "57px" : "90px", // 회전 여부에 따라 width와 height 변경
                            height: rotate[index] ? "90px" : "57px",
                            transform: rotate[index]
                              ? "rotate(-90deg)"
                              : "none", // 회전시키기
                            marginLeft: rotate[index] ? "17.5px" : "0",
                          }}
                        />
                        <div>{card.cardInfo.cardName}</div>
                      </div>
                      {!editMode && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          fill="#A1A1A1"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                        >
                          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                        </svg>
                      )}
                    </Card>
                    <CardBackground>삭제</CardBackground>
                  </div>
                ))}
              </Main>
              <Btn
                onClick={() => {
                  settingCard();
                }}
              >
                카드 등록하기
              </Btn>

              {/* 모달 */}
              {isOpen && (
                <Modal isOpen={isOpen} onClose={closeModal}>
                  <div
                    style={{
                      fontSize: "18px",
                      paddingTop: "25px",
                    }}
                  >
                    '{cardList[swipeCard || 0].cardInfo.cardName}'
                    <br />
                    <br />
                    해당 카드를 삭제하시겠습니까?
                  </div>
                  <div
                    style={{
                      gap: "50px",
                    }}
                  >
                    <button
                      onClick={deleteCard}
                      style={{
                        fontSize: "18px",
                        width: "95px",
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={closeModal}
                      style={{
                        fontSize: "18px",
                        width: "95px",
                      }}
                    >
                      취소
                    </button>
                  </div>
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default BringCard;
