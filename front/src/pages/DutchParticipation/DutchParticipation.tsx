import triangle from "./../../assets/image/triangle.png";
import Participant from "../../components/dutch/Participant/Participant";
import Modal from "../../components/dutch/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { Wrapper, Top, Title, Process, Main, BackImg } from './DutchParticipation.styles';
import { useEffect, useState } from "react";

const DutchParticipation = () => {
  const nav = useNavigate();
  
  const [memberNum, setMemberNum] = useState(''); // 참여자 수 입력 받는 변수
  const [isOpen, setIsOpen] = useState(false); // 더치페이 나가기 모달 상태 관리
  const [timeLeft, setTimeLeft] = useState(600); // 10분(600초) 카운트다운을 위한 상태 관리

  const goHome = () => {
    nav("/home");
  };

  // 더치페이 나가기 버튼 클릭 시 모달 띄우기
  const openModal = () => {
    console.log("더치페이 나가기 버튼 클릭");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 10분 카운트다운 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // 타이머가 0이 되면 종료
    if (timeLeft === 0) {
      clearInterval(timer);
      alert("카운트다운이 완료되었습니다.");
      // 원하는 동작을 추가할 수 있습니다.
    }

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, [timeLeft]);

  // 남은 시간을 분과 초로 변환하는 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Wrapper>
      <Top>
        <Title>
          <div>더치 페이</div>
          {/* 나가기 아이콘(-> 누르면 모달) */}
          <svg
            onClick={openModal}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 48 48"
            fill="#656565"
          >
            <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 29.5 42 C 32.519774 42 35 39.519774 35 36.5 A 1.50015 1.50015 0 1 0 32 36.5 C 32 37.898226 30.898226 39 29.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 L 29.5 9 C 30.898226 9 32 10.101774 32 11.5 A 1.50015 1.50015 0 1 0 35 11.5 C 35 8.4802259 32.519774 6 29.5 6 L 11.5 6 z M 33.484375 15.484375 A 1.50015 1.50015 0 0 0 32.439453 18.060547 L 36.878906 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 36.878906 25.5 L 32.439453 29.939453 A 1.50015 1.50015 0 1 0 34.560547 32.060547 L 41.560547 25.060547 A 1.50015 1.50015 0 0 0 41.560547 22.939453 L 34.560547 15.939453 A 1.50015 1.50015 0 0 0 33.484375 15.484375 z"></path>
          </svg>
        </Title>
          {/* 10분 카운트다운 표시 */}
          <div>{formatTime(timeLeft)}</div>
        <Process>
          <div>시작 대기</div>
          <div>금액 산정</div>
          <div>결제</div>
          <div>정산 대기</div>
          <div>완료</div>
        </Process>
      </Top>

      <Main>
        {/* 3. 더치페이하는 상품 정보 */}
        {/* 2. 참여자 목록 컴포넌트_2단계인지 판단 기준: memberSetComplete === true */}
        <Participant />
      </Main>

      {/* 배경 도형 */}
      <BackImg>
        <img src={triangle} />
        <img src={triangle} />
        <img src={triangle} />
      </BackImg>

      {/* [종료 버튼 미완]더치페이 나가기 모달 */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <svg
            onClick={closeModal}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path>
          </svg>
          <div>더치페이를 중단 시키시겠습니까?</div>
          <div>
            {/* <button onClick={closeModal}>취소</button> */}
            <button>중단</button>
            {/* 종료(중단)버튼: 더치페이 주최자는 더치페이가 모두에게 종료되도록하고 참가자는 참가자 본인만 종료되도록 해야함 */}
            <button onClick={goHome}>홈으로</button>
          </div>
        </Modal>
      )}
    </Wrapper>
  );
};

export default DutchParticipation;
