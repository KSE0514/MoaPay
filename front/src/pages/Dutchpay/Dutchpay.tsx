import triangle from "./../../assets/image/triangle.png"
import Participant from "../../components/dutch/Participant/Participant";

import {
  Wrapper,
  Top,
  LinkBox,
  Main,
  BackImg,
} from './Dutchpay.styles'

const Dutchpay = () => {
  return (
    <Wrapper>
      <Top>
        <div>더치 페이</div>
        {/* 나가기 아이콘 넣어야 함 */}
        <LinkBox>
          인원을 설정해주세요.
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