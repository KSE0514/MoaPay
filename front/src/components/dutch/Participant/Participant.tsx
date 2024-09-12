import { useState } from 'react'
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
} from './Participant.styles'

// useEffect(() => {
//   // 참가자 목록 불러오기_참가자가 새로 들어올 때마다 리스트 조회가 이루어져야함?
// }, [])

const Participant = () => {
  // const [participants, setParticipants] = useState([])

  // 테스트용 데이터_ 후에 지울 예정
  const [participants, setParticipants] = useState([
    {name: '정유진',
    },
    {name: '이대현',
    },
    {name: '주수아',
    },
  ])


  return (
    <Wrapper>
      {/* 더치페이 하여 구매할 상품 정보 */}
      <Product productName={'새콤달콤 티니핑 시즌4 하츄핑 꽃다발 봉제 인형'} productUrl={'https://www.ssg.com/item/itemView.ssg?itemId=1000566517100'} />

      {/* <div>총 금액: {prduct_price}원</div> */}
      <Price>총 금액: 22,990 원</Price>

      {/* 구분 점선 */}
      <img src={line}/> 
      
      {/* 참여자의 분자값: 초대자가 입력한 인원 수가 (props로 넘어오게 해야함) */}
      <Title>참여자({participants.length}/4)</Title>
      {/* 참가자가 있을 경우에만 출력되도록 */}
      <PartiList>
        {participants.length>0 ? 
          participants.map((participant, index)=>(
            <PartiInfo>
              {/* 랜덤 프로필_랜덤 사진 */}
              <div style={{border: '2px solid black', width: '50px', height: '50px', borderRadius: '100%'}}></div>

              <div>{participant.name}</div>
              {/* <div>삭제 아이콘</div> */}
              {/* <div>X</div> */}

              {/* 해당 사용자가 지불해야 할 금액 */}
              <input type="number" min="0"/> 
            </PartiInfo>
          ))
        : true}
      </PartiList>
      <Btn>
        <SquareBtn text={'더치페이 시작'} />
      </Btn>
    </Wrapper>
  )
}

export default Participant;