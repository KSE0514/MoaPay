import { useEffect, useState } from "react";
import Modal from "../../components/dutch/Modal/Modal";
import axios from "axios";
import { useCardStore } from "../../store/CardStore";

import testcard1 from "./../../assets/image/cards/신용카드이미지/14_JADE_Classic.png";
import testcard2 from "./../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png";
import testcard3 from "./../../assets/image/cards/신용카드이미지/11_삼성_iD_SIMPLE_카드.png";
import {
  Wrapper,
  Top,
  EditMode,
  Main,
  Card,
  CardBackground,
  Btn,
} from "./UserCardList.styles";

const UserCardList = () => {
  const CardList = [
    {
      cardNumber: '001',
      name: "JADE Classic",
      img: testcard1,
    },
    {
      cardNumber: '002',
      name: "올바른 FLEX 카드",
      img: testcard2,
    },
    {
      cardNumber: '003',
      name: "삼성 iD SIMPLE 카드",
      img: testcard3,
    },
  ];
  // const { CardList, addCard, removeCard } = useCardStore();
  const { addCard, removeCard } = useCardStore(); // 더미데이터 채워질 시 해당 라인과 테스트용 cardList 삭제하고 위에 코드 주석 풀기

  // 카드 삭제 api 요청(백엔드에 요청시엔 cardNumber로 요청)
  const deleteCard = async (index:number, cardNumber: string) => {
    removeCard(index) // store의 CardList에서 카드 제거
    console.log(index, "삭제할 카드 인덱스 확인용 콘솔")

    // 백엔드에 카드 제거 요청
    try {
      const response = await axios.delete(`요청 api 주소 입력`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("단일 카드 삭제 완료");
      }
    } catch (err) {
      console.error("에러 발생", err);
    }
  };


//   try {
//     // const response = await axios.get(
//     //   `http://localhost:18020/moapay/core/card/mycard`,
//     //   { withCredentials: true }
//     // );
//     //로딩상태 풀고 카드 선택 뷰 보이도록 설정
//     // setCardList(response.data);

//     //Test
//     setCardList(MyCardList);
//     //추가
//     setIsLoding(false);
//     setBefore(false);
//   } catch (e) {
//     const error = e as AxiosError; // AxiosError로 타입 단언
//     console.log(error);
//   }
// };

  const [isOpen, setIsOpen] = useState(false); // 더치페이 나가기 모달 상태 관리
  const [rotate, setRotate] = useState<{ [key: number]: boolean }>({});
  const [swipeDistance, setSwipeDistance] = useState<{ [key: number]: number }>(
    {}
  ); // {key(index): key번째 카드가 왼쪽으로 밀린 거리}

  const [startX, setStartX] = useState(0); // 터치 시작의 X 좌표를 저장
  const [swipeCard, setSwipeCard] = useState<number | null>(null); // 스와이프 된(삭제할) 카드의 index 값을 저장
  const [editMode, setEditMode] = useState(false); // 선택 삭제 모드
  const [selectedCards, setSelectedCards] = useState<number[]>([]); // 선택된 카드 목록
  const [longPressTimeout, setLongPressTimeout] = useState<
    NodeJS.Timeout | null
  >(null); // 긴 터치를 위한 타이머

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
      console.log(CardList[index].name); // 100px 이상 밀렸을 경우 카드 이름 출력
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
      <Top>전체 카드 목록</Top>
      <Main>
        {editMode ? (
          <EditMode>
            <div>전체 선택</div>
            <div>삭제</div>
          </EditMode>
        ) : null}
        {CardList.map((card, index) => (
          <div key={card.name}>
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
              {editMode ? <input type="radio" checked={selectedCards.includes(index)} onChange={() => toggleCardSelection(index)} /> : null}
              <div
                style={{
                  paddingLeft: editMode ? "15px" : "none",
                }}
              >
                <img
                  src={card.img}
                  alt={card.name}
                  onLoad={(event) => handleImageLoad(event, index)} // 이미지가 로드되면 handleImageLoad 호출
                  style={{
                    position: "absolute",
                    width: rotate[index] ? "57px" : "90px", // 회전 여부에 따라 width와 height 변경
                    height: rotate[index] ? "90px" : "57px",
                    transform: rotate[index] ? "rotate(-90deg)" : "none", // 회전시키기
                    marginLeft: rotate[index] ? "17.5px" : "0",
                    userSelect: "none", // 드래그 방지
                  }}
                  draggable="false" // 이미지 드래그 방지
                />
                <div>{card.name}</div>
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
                  style={{
                    cursor: "move",
                  }}
                >
                  <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                </svg>
              )}
            </Card>
            <CardBackground>삭제</CardBackground>
          </div>
        ))}
      </Main>
      <Btn>카드 추가하기</Btn>

      {/* 모달 */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div
            style={{
              fontSize: "18px",
              paddingTop: "25px",
            }}
          >
            '{CardList[swipeCard || 0].name}'
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
              onClick={() => deleteCard(swipeCard, CardList[swipeCard].cardNumber)}
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
    </Wrapper>
  );
};

export default UserCardList;
