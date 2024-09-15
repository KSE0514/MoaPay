import triangle from "./../../assets/image/triangle.png"
import Participant from "../../components/dutch/Participant/Participant";
import axios from "axios";
import {
  Wrapper,
  Top,
  Title,
  LinkBox,
  Main,
  BackImg,
} from './Dutchpay.styles'
import { useState } from "react";

const Dutchpay = () => {
  const [memberNum, setMemberNum] = useState('') // 참여자 수 입력 받는 변수
  const [memberSetComplete, setMemberSetComplete] = useState(false) // 참여자수 설정 완료 여부 판단용

  // 참여자 수 바인딩
  const onChangeMember = (e) => {
    console.log("확인용",e.target.value)
    setMemberNum(e.target.value)
  }

  // 참여자 수 입력 후 완료 버튼을 눌렀을 경우=>설정 완료로 변경
  const onClickComplete = () =>{
    setMemberSetComplete(!memberSetComplete)
  }

  // [미완]더치페이 링크를 받아오는 api 요청(요청 방식 나중에 다시 확인하기)
  const getDutchUrl = async () => {
    try {
      const response = await axios.get(
        `요청 api 주소 입력`,
        {
          headers: {
            "Content-Type": "application/json",
          }
          // withCredentials: true, // 쿠키를 포함하여 요청 <----- 필요한가?
        },
      );
      if (response.status === 200) {
        console.log("더치페이 url 생성완료")
      }
    } catch (err) {
      console.error("에러 발생", err);
    }
  };

// useEffect(()=>{
// getDutchUrl() // 참가 인원을 입력할 경우 더치페이 링크를 받아오는 api 요청
// }, [memberSetComplete]) // 참가 인원 세팅완료 여부 변수에 변화가 있을 때 조회가 되도록

  return (
    <Wrapper>
      <Top>
        <Title>
          <div>더치 페이</div>
          {/* 나가기 아이콘(-> 누르면 모달) */}
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" fill="#656565">
            <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 29.5 42 C 32.519774 42 35 39.519774 35 36.5 A 1.50015 1.50015 0 1 0 32 36.5 C 32 37.898226 30.898226 39 29.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 L 29.5 9 C 30.898226 9 32 10.101774 32 11.5 A 1.50015 1.50015 0 1 0 35 11.5 C 35 8.4802259 32.519774 6 29.5 6 L 11.5 6 z M 33.484375 15.484375 A 1.50015 1.50015 0 0 0 32.439453 18.060547 L 36.878906 22.5 L 15.5 22.5 A 1.50015 1.50015 0 1 0 15.5 25.5 L 36.878906 25.5 L 32.439453 29.939453 A 1.50015 1.50015 0 1 0 34.560547 32.060547 L 41.560547 25.060547 A 1.50015 1.50015 0 0 0 41.560547 22.939453 L 34.560547 15.939453 A 1.50015 1.50015 0 0 0 33.484375 15.484375 z"></path>
          </svg>
        </Title>
        <LinkBox>
          <input value={memberNum} type="number" placeholder="인원을 설정해주세요." onChange={onChangeMember}/>
          
          {/* 사용자가 인원을 입력했을 경우에만 다음 화살표(->누르면 재확인 모달)가 나타나도록 함 */}
          {memberNum? 
            <svg onClick={onClickComplete} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" fill="#ffffff">
              <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 25.484375 16.484375 A 1.50015 1.50015 0 0 0 24.439453 19.060547 L 27.878906 22.5 L 16.5 22.5 A 1.50015 1.50015 0 1 0 16.5 25.5 L 27.878906 25.5 L 24.439453 28.939453 A 1.50015 1.50015 0 1 0 26.560547 31.060547 L 32.560547 25.060547 A 1.50015 1.50015 0 0 0 32.560547 22.939453 L 26.560547 16.939453 A 1.50015 1.50015 0 0 0 25.484375 16.484375 z"></path>
            </svg>
          :
           null
          }
        </LinkBox>
      </Top>

      <Main>
        {/* 3. 더치페이하는 상품 정보 */}
        {/* 2. 참여자 목록 컴포넌트 */}
        <Participant />
      </Main>

      {/* 배경 도형 */}
      <BackImg>
        <img src={triangle}/>
        <img src={triangle}/>
        <img src={triangle}/>
      </BackImg>
    </Wrapper>
  )
};
export default Dutchpay;
