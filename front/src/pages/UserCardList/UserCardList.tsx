import { useState } from "react";
import Modal from "../../components/dutch/Modal/Modal";
import axios from "axios";

import testcard1 from "./../../assets/image/cards/신용카드이미지/14_JADE_Classic.png"
import testcard2 from "./../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png"
import testcard3 from "./../../assets/image/cards/신용카드이미지/11_삼성_iD_SIMPLE_카드.png"
import {
  Wrapper,
  Top,
  Main,
  Card,
  CardBackground,
  Btn,
  Bottom,
} from "./UserCardList.styles"

const UserCardList = () => {
  // 테스트용 카드 리스트
  const cardListData = [
    {
      name: "JADE Classic",
      img: testcard1
    },
    {
      name: "올바른 FLEX 카드",
      img: testcard2
    },
    {
      name: "삼성 iD SIMPLE 카드",
      img: testcard3
    },
  ]

  // 카드 삭제 api 요청
  const deleteCard = async() => {
    try {
      const response = await axios.delete(
        `요청 api 주소 입력`,
        {
          headers: {
            "Content-Type": "application/json",
          }
          // withCredentials: true, // 쿠키를 포함하여 요청 <----- 필요한가?
        },
      );
      if (response.status === 200) {
        console.log("단일 카드 삭제 완료")
      }
    } catch (err) {
      console.error("에러 발생", err)
    }
  };

  const [isOpen, setIsOpen] = useState(false); // 더치페이 나가기 모달 상태 관리

  const [rotate, setRotate] = useState<{ [key: number]: boolean}>({});
  const [swipeDistance, setSwipeDistance] = useState<{[key: number]:number}>({}) // {key(index): key번째 카드가 왼쪽으로 밀린 거리}

  const [startX, setStartX] = useState(0); // 터치 시작의 X 좌표를 저장


  const closeModal = () => {
    setIsOpen(false);
  };

  // 카드 가로, 세로 길이에 따른 회전 여부 판단 핸들러
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    index: number
  ) => {
    const imgElement = event.currentTarget;
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate((prevRotate) => ({...prevRotate, [index]: true}))
    }
  }

  // 터치 시작 시 startX에 X좌표 저장
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0]; // 첫 번째 터치 이벤트
    setStartX(touch.clientX);
  }
  
  // 터치 이동 시 카드를 이동시키는 동작
  const handleTouchMove = (e: React.TouchEvent, index: number) => {
    const touch = e.touches[0]; // 첫 번째 터치 이벤트
    const moveX = touch.clientX;

    // 스와이프 거리 계산(시작점 - 현재 위치)
    const deltaX = startX - moveX;

    if (deltaX > 0) {
      //왼쪽으로 이동한 경우
      setSwipeDistance((prev) => ({...prev, [index]: deltaX}));
    }
  }
  
  // 터치 끝났을 때 처리
  const handleTouchEnd = (index: number) => {
    if (swipeDistance[index] >= 100) {
      console.log(cardListData[index].name); // 100px 이상 밀렸을 경우카드 이름 console에 출력
      setIsOpen(true);
    }
    
    // 스와이프가 끝나면 초기화
    setSwipeDistance((prev) => ({...prev, [index]: 0}))
  }
  
  return (
    <Wrapper>
      <Top>
        전체 카드 목록
      </Top>
      <Main>
        {cardListData.map((card, index) => (
          <div key={card.name}>
            
            <Card 
              key={index}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={() => handleTouchEnd(index)}
              style={{
                transform: `translateX(-${swipeDistance[index] || 0}px)`,
                backgroundColor: "white", 
              }}
              >
              <div>
                <img 
                  src={card.img}
                  alt={card.name}
                  onLoad={(event) => handleImageLoad(event, index)} // 이미지가 로드되면 handleImageLoad 호출
                  style={{
                    position: "absolute",
                    width: rotate[index] ? "57px" : "90px", // 회전 여부에 따라 width와 height 변경
                    height: rotate[index] ? "90px" : "57px",
                    transform: rotate[index] ? "rotate(-90deg)" : "none", //회전시키기
                    marginLeft: rotate[index] ? "17.5px" : "0",
                  }}
                />
                <div>{card.name}</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#A1A1A1" width="30" height="30" viewBox="0 0 30 30">
                <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
              </svg>
            </Card>
            <CardBackground>삭제</CardBackground>
          </div>
        ))}
      </Main>
      <Btn>카드 추가하기</Btn> 
      {/* <Bottom>
      </Bottom> */}

    {/* 모달 */}
        {/* 카드 옆으로 밀었을 시 나오는 삭제 모달 */}
        {isOpen && (
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div>'카드 이름'카드를 삭제하시겠습니까?</div>
            <div>
              <button onClick={deleteCard}>삭제</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </Modal>
        )} 
    </Wrapper>
  );
};
export default UserCardList;
