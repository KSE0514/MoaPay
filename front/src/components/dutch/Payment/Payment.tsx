import Product from "../Product/Product";
import SquareBtn from "../SquareBtn/SquareBtn";

import line from "./../../../assets/image/dutch_line_white.png"

import {
  Wrapper,
  Price,
} from "./Payment.styles"

const Payment = () => {
  return (
    <Wrapper>
      {/* 상품 이름 및 경로를 어떻게 가져올 것인지에 대해서 생각해봐야 함 */}
      <Product productName={'새콤달콤 티니핑 시즌4 하츄핑 꽃다발 봉제 인형'} productUrl={'https://www.ssg.com/item/itemView.ssg?itemId=1000566517100'} />
      
      {/* <div>총 금액: {prduct_price}원</div> */}
      <Price>총 금액: 22,990 원</Price>

      {/* 구분 점선 */}
      <img src={line}/> 

      {/* 결제 금액 넘겨 받아야 함 */}
      <SquareBtn text={'7,000원 결제하기'} color={'white'} />
    </Wrapper>
  )
}

export default Payment;