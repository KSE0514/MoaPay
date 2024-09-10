import { useState } from 'react'
import SquareBtn from '../SquareBtn/SquareBtn'
// import { useEffect } from 'react';
import {
  Title,
  Btn,
} from './Participant.styles'

// useEffect(() => {
//   // 참가자 목록 불러오기_참가자가 새로 들어올 때마다 리스트 조회가 이루어져야함?
// }, [])

const Participant = () => {
  const [participants, setParticipants] = useState()
  return (
    <>
      <Title>참여자</Title>
      <Btn>
        <SquareBtn text={'더치페이 시작'} />
      </Btn>
      {/* 참가자가 있을 경우에만 출력되도록 */}
      {participants ? true : true}
    </>
  )
}

export default Participant;