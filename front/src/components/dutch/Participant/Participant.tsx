import { useEffect, useState } from 'react'
import axios from 'axios'
import SquareBtn from '../SquareBtn/SquareBtn'
import Product from '../Product/Product'

import line from "./../../../assets/image/dutch_line.png"
// import { useEffect } from 'react';
import {
  Wrapper,
  Price,
  Title,
  PartiList,
  PartiInfo,
  Btn,
  WarningMessage,
} from './Participant.styles'

// useEffect(() => {
//   // 참가자 목록 불러오기_참가자가 새로 들어올 때마다 리스트 조회가 이루어져야함?
// }, [])

interface ParticipantProps {
  maxNum?: number | null;
  roomId: string;
  participants: {
    index: number;
    uuid: string;
    memberId: string;
    memberName: string;
    charge: number | null; // 초기값은 null일 수 있도록 설정
  }[];
}

// interface Participant {
//   name: string;
//   id: number;
//   charge: string;
// }

const Participant = ({maxNum=null, roomId, participants}: ParticipantProps) => {
  // const [participants, setParticipants] = useState([])
  const [isHost, setIsHost] = useState<boolean>(false)
  const [dutchStart, setDutchStart] = useState<boolean>(false)
  const [showWarning, setShowWarning] = useState<boolean>(false)  // 경고 메시지 상태 추가
  const [price, setPrice] = useState<number>(1001) // 더치페이 상품 가격
  // const [participantPrice, setParticipantsPrice] = useState<number>(0) // 참가자 자동 배분 결제금
  // 테스트용 데이터_ 후에 지울 예정
  // const [participants, setParticipants] = useState<Participant[]>([
  //   {name: '정유진', id:1, charge: '',
  //   },
  //   {name: '이대현', id:2, charge: '',
  //   },
  //   {name: '주수아', id:3, charge: '',
  //   },
  // ])

  // 참가자 정보 가져오기(방 정보 불러오기를 통해 참가자 리스트 조회)
  // const getDutchRoomData = async () => {
  //   try{
  //     const response = await axios.
  //   }
  // }

  // [미완]특정 참가자 추방(삭제) api 호출 함수_id로 삭제하게 될 것 같아 id를 인자로 넘겨놓음(나중에 다시 체크하기)
  const onDelete = async (id:number) => {
    // console.log(id, "삭제")
    try{
      const response = await axios.delete(
        `요청 api 주소 입력`,
        {
          headers: {
            "Content-Type": "application/json",
          }
          // withCredentials: true, // 쿠키를 포함하여 요청 <--- 필요한가?
        },
      );
      if (response.status === 200) {
        console.log("삭제 완료")
      }
    } catch (err) {
      console.error("에러 발생", err)
    }
  }

  // 더치페이 시작 버튼을 눌렀을 시
  const onClickDutchStart = () =>{
    // if (주최자일 경우에만) {
      console.log("더치페이 시작 버튼 클릭")
      // setParticipantsPrice(Math.floor(price / participants.length)) // 전체금을 참여 인원수로 나눈값(나머지 버림)을 자동 배분 결제금으로 저장
      const participantPrice = Math.floor(price / participants.length)
      console.log('자동분배금 확인용', Math.floor(price / participants.length))
      setDutchStart(true)
    // }

    // 금액 자동 분배하기
    participants.map((participant, index) => {
      if (index === 0) {
        participant.charge = price - (participantPrice * ( participants.length -1 )) 
      } else {
        participant.charge = participantPrice
      }
    })
  }

  // 결제 요청 버튼을 눌렀을 시
  const onClickRequest = () => {
    // 결제 요청 시 모든 참가자의 charge가 입력되었는지 확인
    const isAnyChargeEmpty = participants.some(participant => participant.charge === '');

    if (isAnyChargeEmpty) {
      setShowWarning(true);  // 경고 메시지 표시
      setTimeout(() => setShowWarning(false), 1500);  // 3초 후 경고 메시지 숨김
    } else {
      // 모든 charge가 입력된 경우 결제 요청 로직 수행
      console.log("결제 요청");
    }
  }

  const changeCharge = (index: number, value: string) => {
    const updateParticipants = [...participants];
    updateParticipants[index] = {...updateParticipants[index], charge:value};
    setParticipants(updateParticipants)
  }
   
  useEffect(() => {
    setDutchStart(false)
    setIsHost(JSON.parse(localStorage.getItem('isHost') || 'false')); // localStorage에서 가져오는 코드
  }, [])

  return (
    <Wrapper>
      {/* 더치 페이 시작 버튼을 눌렀을 시에만 보이는 정보들 설정*/}
      {/* api 호출 해서 넘어왔으면 하는 정보: 상품 사진, 상품명, url, 가격*/}
      {dutchStart? 
      <>
        {/* 더치페이 하여 구매할 상품 정보 */}
        <Product productName={'새콤달콤 티니핑 시즌4 하츄핑 꽃다발 봉제 인형'} productUrl={'https://www.ssg.com/item/itemView.ssg?itemId=1000566517100'} />

        {/* <div>총 금액: {prduct_price}원</div> */}
        <Price>총 금액: {price.toLocaleString()} 원</Price>

        {/* 구분 점선 */}
        <img src={line}/> 
      </>
      :
      null
      }
      
      {/* 참여자의 분자값: 초대자가 입력한 인원 수가 (props로 넘어오게 해야함) */}
      <Title>참여자({participants.length}/{maxNum})</Title>
      {/* 참가자가 있을 경우에만 출력되도록 */}
      <PartiList>
        {participants.length>0 ? 
          participants.map((participant, index)=>(
            <PartiInfo key={index}>
              {/* 랜덤 프로필_랜덤 사진 */}
              <div style={{border: '2px solid black', width: '50px', height: '50px', borderRadius: '100%'}}></div>

              <div>{participant.memberName}</div>
              {/* <div>삭제 아이콘</div> */}
              {!dutchStart&&(participant.index>0)&&
              isHost&&
              <svg onClick={()=>onDelete(participant.index)} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path>
              </svg>}
              {/* <div>X</div> */}

              {
              // !isHost&&
              ((participant.index === 0)||(!isHost))&&
              <div></div>
              }

              {/* 해당 사용자가 지불해야 할 금액 */}
              {/* 자동으로 n등분 해서 분배해줘야 함_안 나눠 떨어질 경우: 주최자를 제외한 모두에게 (전체 값//사람 수)값 적용. 주최자는 (전체 값-(참가자)*(n-1)) */}
              {dutchStart&&<input value={participant.charge} onChange={(e)=>{changeCharge(index, e.target.value)}} type="number" min="0"/> }
            </PartiInfo>
          ))
        : true}
      </PartiList>


      <Btn>
        {dutchStart? 
          <SquareBtn text={'결제 요청하기'} color={'rgba(255, 255, 255, 0.7)'} onClick={onClickRequest} />
          :
          ((participants.length > 0)&&isHost?
            <SquareBtn text={'더치페이 시작'} color='rgba(135, 72, 243, 0.74)' onClick={onClickDutchStart} />
            :
            null
            // (isHost?
            //   null
            //   :
            //   <SquareBtn text={'더치페이 시작'} color='rgba(135, 72, 243, 0.74)' onClick={onClickDutchStart} />

            // )
          )
        }
        {/* 경고 메시지 출력 */}
      </Btn>
        {showWarning && <WarningMessage>결제 요청 금액을 입력해주세요.</WarningMessage>}
    </Wrapper>
  )
}

export default Participant;