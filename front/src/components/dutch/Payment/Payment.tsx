import Product from "../Product/Product";
// import SquareBtn from "../SquareBtn/SquareBtn";
import { useState } from "react";

import line from "./../../../assets/image/dutch_line_white.png"
import testCard from "./../../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png"
import testCard2 from "./../../../assets/image/cards/신용카드이미지/14_JADE_Classic.png"

import {
  Wrapper,
  Price,
  Card,
  CardInfo,
  Btn,
} from "./Payment.styles"

const testMainCard = {
  index:0,
  img:testCard, 
  name: "올바른 FLEX 카드"
}
const testMainCard2 = {
  index:1,
  img:testCard2, 
  name: "올바른 FLEX 카드"
}

const Payment = ({onClick}) => {
  const [rotate, setRotate] = useState(false);

  // 카드 가로, 세로 길이에 따른 회전 여부 판단 핸들러
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    // index: number
  ) => {
    const imgElement = event.currentTarget;
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate(true);
    }
  };
  return (
    <Wrapper>
      {/* 상품 이름 및 경로를 어떻게 가져올 것인지에 대해서 생각해봐야 함 */}
      <Product productName={'새콤달콤 티니핑 시즌4 하츄핑 꽃다발 봉제 인형'} productUrl={'https://www.ssg.com/item/itemView.ssg?itemId=1000566517100'} />
      
      {/* <div>총 금액: {prduct_price}원</div> */}
      <Price>총 금액: 22,990 원</Price>

      {/* 구분 점선 */}
      <img src={line}/> 

      <Card>
        <CardInfo>
          <img
            onLoad={(event) => handleImageLoad(event)} // 이미지가 로드되면 handleImageLoad 호출
            style={{
              // position: "absolute",
              width: rotate ? "57px" : "90px", // 회전 여부에 따라 width와 height 변경
              height: rotate ? "90px" : "57px",
              transform: rotate ? "rotate(-90deg)" : "none", // 회전시키기
              marginLeft: rotate ? "17.5px" : "0",
            }}
          src={testMainCard.img} />
          <div>{testMainCard.name}</div>
        </CardInfo>
         <div>다른카드 선택하기</div>
      </Card>

      {/* 결제 금액 넘겨 받아야 함 */}
      <Btn>7,000원 결제하기</Btn> 
      {/* text={'7,000원 결제하기'} color={'white'} onClick={onClick} /> */}

    </Wrapper>
  )
}

export default Payment;