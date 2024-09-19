import Product from "../../components/dutch/Product/Product";
import backImg from "./../../assets/image/dutchheader.png";
import { useNavigate } from "react-router-dom";

import {
  Wrapper,
  Top,
  Main,
} from "./DutchInvite.styles"

const DutchInvite = () => {
  const nav = useNavigate()

  const onClickAccept = () =>[
    nav('/dutchpay')
  ]

  const goHome = () => {
    nav('/home')
  }

  return(
    <Wrapper>
      <Top>
        <img src={backImg} />
        <div>
          {/* 상품 정보는 또 어떻게 들고와야하지... */}
          <Product productName={'새콤달콤 티니핑 시즌4 하츄핑 꽃다발 봉제 인형'} productUrl={'https://www.ssg.com/item/itemView.ssg?itemId=1000566517100'} />
        </div>
      </Top>
      <Main>
        {/* 주최자 이름을 어떻게 들고와야 하는가... */}
        <div>'주최자 이름'님이</div>
        <div>더치페이를</div>
        <div>신청했습니다.</div>
        <div>
          {/* [미완]_수락 버튼 클릭시 어떤 방식으로 처리할 건지 더 생각해보기-> 참가자 전용 진행 페이지 따로? 참가자&주최자 같은 /dutch에서 진행하되 변수로 구분하여 분리...? */}
          <button onClick={onClickAccept}>수락</button>
          <button onClick={goHome}>취소</button>
        </div>
      </Main>
    </Wrapper>
  )
}

export default DutchInvite;