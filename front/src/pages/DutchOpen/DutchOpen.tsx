import triangle from "./../../assets/image/triangle.png"
import Modal from "../../components/dutch/Modal/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Client } from "@stomp/stompjs";

import {
  Wrapper,
  Top,
  Title,
  LinkBox,
  // CopyIcon,
  // ShareUrl,
  Main,
  BackImg,
} from './DutchOpen.styles'

import { useEffect, useState } from "react";
import { PATH } from "../../constants/path";

const DutchOpen = () => {
  const nav = useNavigate()
  
  const [isOpen, setIsOpen] = useState(false); // 더치페이 나가기 모달 상태 관리
  const [isCompleteSettingCheck, setIsCompleteSettingCheck] = useState(false); // 더치페이 인원 설정 완료 확인용 모달 띄우기 판단용
  const [memberNum, setMemberNum] = useState('') // 참여자 수 입력 받는 변수

  const [memberSetComplete, setMemberSetComplete] = useState(false) // 참여자수 설정 완료 여부 판단용
  const [stop, setStop] = useState(false) // 더치페이 중단하기 버튼을 눌렀는지의 여부를 판단



  //////////////////////////////////////////////////////////////////////////////////////////
  const [roomId, setRoomId] = useState<string>(""); // 방 ID
  const [memberId, setMemberId] = useState<string>(
    "01923d9f-7b3d-78dd-9f9d-32f85c64fbcd"
  ); // 멤버 ID
  const [joinUrl, setJoinUrl] = useState<string>(""); // 방 참여 URL
  const [roomInfo, setRoomInfo] = useState<any>(null); // 방 정보
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트

  // 방 생성에 필요한 필드
  const [maxMember, setMemberCnt] = useState<number | string>(''); // 총원 수
  const [orderId, setOrderId] = useState<string>(
    "01923d9f-7b3d-70e9-ad8d-68a3ab09d578"
  ); // 주문 ID
  const [merchantId, setMerchantId] = useState<string>(
    "01923d9f-7b3d-7a9e-a0b3-24d7970f90d4"
  ); // 상점 ID
  const [merchantName, setMerchantName] = useState<string>("Example Merchant"); // 상점 이름
  const [categoryId, setCategoryId] = useState<string>("category"); // 카테고리 ID
  const [totalPrice, setTotalPrice] = useState<number>(10000); // 총 가격
  const [memberName, setMemberName] = useState<string>("");

  // 방 생성 함수
  const createRoom = async () => {
    const requestBody = {
      memberId: memberId,
      maxMember: maxMember,
      orderId: orderId,
      merchantId: merchantId,
      merchantName: merchantName,
      categoryId: categoryId,
      totalPrice: totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:18020/moapay/core/dutchpay/createRoom",
        requestBody
      );
      console.log("Room created:", response.data);

      // message.body를 DutchRoomMessage 타입으로 변환
      const parsedMessage: DutchRoomMessage = response.data;
      setJoinUrl(parsedMessage.data); // 방 생성 후 반환된 URL 저장
      setRoomId(parsedMessage.data); // 생성된 방의 roomId 저장

      nav(PATH.DUTCHPAY) // 인원 설정하여 방 생성 후 다음 페이지로 이동
      connectWebSocket() // WebSocket연결해서 Stomp 실행
      joinRoom() // 방 참여
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // 방 참여 함수 (STOMP로 메시지 보내기)
  const joinRoom = () => {
    console.log("join room");
    if (!stompClient || !stompClient.connected || !roomId) return;

    const requestBody = {
      memberId: memberId,
      memberName: memberName,
    };

    stompClient.publish({
      destination: `/pub/dutchpay/join/${roomId}`,
      body: JSON.stringify(requestBody),
    });

    console.log("Joining room:", roomId);
  };

  const leaveRoom = () => {
    console.log("leave Room");
    if (!stompClient || !stompClient.connected || !roomId) return;

    const requestBody = {
      roomId: roomId,
      memberId: memberId,
    };

    stompClient.publish({
      destination: `/pub/dutchpay/leave/${roomId}`,
      body: JSON.stringify(requestBody),
    });

    console.log("Leave room:", roomId);
  };

  const check = () => {
    console.log("check Room");
    if (!stompClient || !stompClient.connected || !roomId) return;

    const requestBody = {
      memberId: memberId,
    };

    stompClient.publish({
      destination: `/pub/dutchpay/dutchRoom/${roomId}`,
    });

    console.log("confirm room:", roomId);
  };

  const confirm = () => {
    console.log("confirm Room");
    if (!stompClient || !stompClient.connected || !roomId) return;

    // 요청 바디 구조 정의
    const requestBody = {
      roomId: roomId,
      memberCnt: 2, // 실제 멤버 수를 여기에 설정
      confirmPriceDtos: [
        {
          memberId: "01923d9f-7b3d-78dd-9f9d-32f85c64fbcd", // 실제 멤버 ID 설정
          price: 5000, // 실제 금액 설정
        },
        {
          memberId: "01923d9f-7b3d-70e9-ad8d-68a3ab09d578", // 두 번째 멤버 ID 설정
          price: 5000, // 실제 금액 설정
        },
      ],
    };

    stompClient.publish({
      destination: `/pub/dutchpay/confirm/${roomId}`,
      body: JSON.stringify(requestBody),
    });

    console.log("confirm room:", roomId);
  };

  // 서버로부터 받은 메시지의 타입 정의
  interface DutchRoomMessage {
    status: string;
    message: string;
    data: string; // UUID나 다른 타입에 맞게 수정 가능
  }

  // WebSocket 연결 설정
  const connectWebSocket = () => {
    const client = new Client({
      brokerURL: "ws://localhost:18020/moapay/core/ws/dutchpay", // WebSocket URL
      onConnect: (frame) => {
        console.log("Connected: " + frame);
        // 방 참여 시 메시지 구독
        client.subscribe(`/sub/dutch-room/${roomId}`, (message) => {
          console.log("Message received:", message.body);
          setRoomInfo(JSON.parse(message.body)); // 받은 메시지를 상태에 저장
        });
      },
      onStompError: (frame) => {
        console.error("Broker error: ", frame.headers["message"]);
      },
    });

    client.activate(); // 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 저장
  };

  // 컴포넌트 언마운트 시 클라이언트 비활성화
  useEffect(() => {
    return () => {
      stompClient?.deactivate(); // 클라이언트 비활성화
    };
  }, [stompClient]);

/////////////////////////////////////////////

  // 참여자 수 바인딩
  const onChangeMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("확인용",e.target.value)
    setMemberNum(e.target.value)
  }

  // 참여자 수 입력 후 완료 버튼을 눌렀을 경우=>설정 완료로 변경
  const onCheckComplete = () =>{
    setIsCompleteSettingCheck(true)
  }

  const goHome = () => {
    nav(PATH.HOME)
  }

  // 더치페이 나가기 버튼 클릭 시 모달 띄우기
  const openModal = () => {
    console.log("더치페이 나가기 버튼 클릭");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeSettingModal = () => {
    setIsCompleteSettingCheck(false);
  };
  const completeMemberSetting = () => {
    setMemberSetComplete(true) // 나중에 지울 수도 있음
    setIsCompleteSettingCheck(false); // 나중에 지울 수도 있음
    nav(PATH.DUTCHPAY) // 더치페이 화면으로 이동


    // stomp 열기...? 더치페이 방 여는 axios 요청
  };

  const onClickStop = () => {
    setStop(true)
  }

  useEffect(() => {
    setMemberSetComplete(false)
  }, []) // 맨 처음 랜더링 시(더치페이를 처음으로 실행시킬 시) 값 초기화해야할 것들

  return (
    <Wrapper>
      <Top>
        <Title>
          <div>더치 페이</div>
          {/* 나가기 아이콘(-> 누르면 모달) */}
          <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" fill="#656565">
            <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 29.5 42 C 32.519774 42 35 39.519774 35 36.5 A 1.50015 1.50015 0 1 0 32 36.5 C 32 37.898226 30.898226 39 29.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 L 29.5 9 C 30.898226 9 32 10.101774 32 11.5 A 1.50015 1.50015 0 1 0 35 11.5 C 35 8.4802259 32.519774 6 29.5 6 L 11.5 6 z M 33.484375 15.484375 A 1.50015 1.50015 0 0 0 32.439453 18.060547 L 36.878906 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 36.878906 25.5 L 32.439453 29.939453 A 1.50015 1.50015 0 1 0 34.560547 32.060547 L 41.560547 25.060547 A 1.50015 1.50015 0 0 0 41.560547 22.939453 L 34.560547 15.939453 A 1.50015 1.50015 0 0 0 33.484375 15.484375 z"></path>
          </svg>
        </Title>
        <LinkBox>
          {!memberSetComplete&&
            <input value={maxMember} type="number" placeholder="인원을 설정해주세요." onChange={(e) => {
              const value = e.target.value;
              setMemberCnt(value === "" ? "" : Number(value));}}/>
          }

          {/* 사용자가 인원을 입력했을 경우에만 다음 화살표(->누르면 재확인 모달)가 나타나도록 함 */}
          {maxMember&&!memberSetComplete? 
            <svg onClick={onCheckComplete} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" fill="#ffffff">
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 25.484375 16.484375 A 1.50015 1.50015 0 0 0 24.439453 19.060547 L 27.878906 22.5 L 16.5 22.5 A 1.50015 1.50015 0 1 0 16.5 25.5 L 27.878906 25.5 L 24.439453 28.939453 A 1.50015 1.50015 0 1 0 26.560547 31.060547 L 32.560547 25.060547 A 1.50015 1.50015 0 0 0 32.560547 22.939453 L 26.560547 16.939453 A 1.50015 1.50015 0 0 0 25.484375 16.484375 z"></path>
            </svg>
          :
            null
          }

          {/* {maxMember&&memberSetComplete&&<ShareUrl>{dutchUrl}</ShareUrl>} */}
        </LinkBox>
      </Top>

      <Main>
        {/* 3. 더치페이하는 상품 정보 */}
        {/* 2. 참여자 목록 컴포넌트_2단계인지 판단 기준: memberSetComplete === true */}
        {/* {memberSetComplete&&<Participant maxNum={Number(maxMember)} isHost={isHost} />} */}
      </Main>

      {/* 배경 도형 */}
      <BackImg>
        <img src={triangle}/>
        <img src={triangle}/>
        <img src={triangle}/>
      </BackImg>


{/* 모달 */}
      {/* 더치페이 인원 설정 확인용 모달 */}
      {isCompleteSettingCheck&&(
        <Modal isOpen={isCompleteSettingCheck} onClose={closeSettingModal}>
          <div>{maxMember}명과 더치페이를 진행하시겠습니까?</div>
          <div>
            <button onClick={createRoom}>확인</button>
            <button onClick={closeSettingModal}>취소</button>
          </div>
        </Modal>
      )}

      {/* [종료 버튼 미완]더치페이 나가기 모달 */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
            <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path>
          </svg>
          {stop ? 
            <div>정말 더치페이를 중단시키겠습니까?</div>
          :
            <div>더치페이를 중단 시키시겠습니까?</div>
          }
          <div>
            {/* <button onClick={closeModal}>취소</button> */}
            {/* 종료(중단)버튼: 더치페이 주최자는 더치페이가 모두에게 종료되도록하고 참가자는 참가자 본인만 종료되도록 해야함  */}
            {stop ? 
              <button>예</button>
            :
              <button onClick={onClickStop}>중단</button>
            }
            {stop ? 
              <button onClick={() => {setStop(false)}}>취소</button>
            :
              <button onClick={goHome}>홈으로</button>
            }
          </div>
        </Modal>
      )}


<div>
      <h1>Dutch Pay Test Client</h1>

      <h2>Create Room</h2>

      <input
        type="number"
        placeholder="Member Count"
        value={maxMember}
        onChange={(e) => setMemberCnt(Number(e.target.value))}
      />
      <p>Order ID: {orderId}</p>
      <p>Merchant ID: {merchantId}</p>
      <p>Merchant Name: {merchantName}</p>
      <p>Category ID: {categoryId}</p>
      <input
        type="number"
        placeholder="Total Price"
        value={totalPrice}
        onChange={(e) => setTotalPrice(Number(e.target.value))}
      />
      <button onClick={createRoom}>Create Room</button>
      {joinUrl && (
        <p>
          Join URL: <a href={joinUrl}>{joinUrl}</a>
        </p>
      )}

      <h2>Join Room</h2>
      <input
        type="text"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)} // 멤버 ID 수정 가능하도록 설정
      />
      <br></br>
      <p>Member ID:</p>
      <input
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)} // 멤버 ID 수정 가능하도록 설정
      />
      <br></br>
      <p>룸 UUID</p>
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <br />
      <br />
      <button onClick={connectWebSocket}>Connect WebSocket</button>
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={leaveRoom}>Leave Room</button>
      <button onClick={check}>Check</button>
      <button onClick={confirm}>Confirm</button>

      {roomInfo && (
        <div>
          <h3>Room Info:</h3>
          <pre>{JSON.stringify(roomInfo, null, 2)}</pre>
        </div>
      )}
    </div>
    </Wrapper>
  )
}

export default DutchOpen;