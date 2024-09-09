import {
  Wrapper,
  Top,
  LinkBox,
  Triangle,
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
      <Triangle>
      </Triangle>
    </Wrapper>
  )
};
export default Dutchpay;