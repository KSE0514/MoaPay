import Product from "../Product/Product";
// import SquareBtn from "../SquareBtn/SquareBtn";
import { useState, useEffect } from "react";

import SelectCardList from "./../SelectCardList/SelectCardList";
import Modal from "../Modal/Modal";
import line from "./../../../assets/image/dutch_line_white.png";
import testCard from "./../../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png";
import testCard2 from "./../../../assets/image/cards/신용카드이미지/14_JADE_Classic.png";
import { Card } from "../../../store/CardStore";
import { useCardStore } from "../../../store/CardStore";
import {
  Wrapper,
  Price,
  CardView,
  CardInfo,
  Bottom,
  Btn,
  SelectModal,
} from "./Payment.styles";

const testMainCard = {
  index: 0,
  img: testCard,
  name: "올바른 FLEX 카드",
};
const testMainCard2 = {
  index: 1,
  img: testCard2,
  name: "올바른 FLEX 카드",
};

interface PaymentProps {
  onClick: () => void;
  confirmAmount: number;
}

const Payment = ({ onClick, confirmAmount }: PaymentProps) => {

  const [rotate, setRotate] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(); // 선택된 카드(결제 카드)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [orderId, setOrderId] = useState<string>(
    "01923d9f-7b3d-70e9-ad8d-68a3ab09d578"
  ); // 주문 ID
  const [totalPrice, setTotalPrice] = useState<number>(10000); // 총 가격
  const [categoryId, setCategoryId] = useState<string>("category"); // 카테고리 ID
  const [merchantId, setMerchantId] = useState<string>(
    "01923d9f-7b3d-7a9e-a0b3-24d7970f90d4"
  ); // 상점 ID
  const [requestId, setRequestId] = useState<string>("");

  useEffect(() => {
    // totalPrice는 숫자형으로 변환하되, 유효하지 않을 경우 0으로 설정
    const storedTotalPrice = parseInt(localStorage.getItem("totalPrice") || "0", 10);
    const validatedTotalPrice = isNaN(storedTotalPrice) ? 0 : storedTotalPrice;

    // localStorage에서 값 가져오기
    setOrderId(localStorage.getItem("orderId") || "");
    setTotalPrice(validatedTotalPrice);
    setCategoryId(localStorage.getItem("categoryId") || "");
    setMerchantId(localStorage.getItem("merchantId") || "");
    setRequestId(localStorage.getItem("requestId") || "");
    // 값 로그로 출력
    console.log("Order ID:", localStorage.getItem("orderId"));
    console.log("Total Price:", localStorage.getItem("totalPrice"));
    console.log("Category ID:", localStorage.getItem("categoryId"));
    console.log("Merchant ID:", localStorage.getItem("merchantId"));
    console.log("Request ID:", localStorage.getItem("requestId"));
  }, []);

  // 카드 가로, 세로 길이에 따른 회전 여부 판단 핸들러
  const handleImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
    // index: number
  ) => {
    const imgElement = event.currentTarget;
    if (imgElement.naturalWidth < imgElement.naturalHeight) {
      setRotate(true);
    }
  };

  // 다른 카드 선택하기 버튼을 눌렀을 경우
  const onClickChangeCard = () => {
    setIsOpen(true);
  };

  // 결제할 카드를 선택했을 경우
  const onSelectCard = (card: Card) => {
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Wrapper>
      {/* 상품 이름 및 경로를 어떻게 가져올 것인지에 대해서 생각해봐야 함 */}
      <Product
        productName={"새콤달콤 티니핑 시즌4 하츄핑 꽃다발 봉제 인형"}
        productUrl={
          "https://www.ssg.com/item/itemView.ssg?itemId=1000566517100"
        }
      />

      {/* <div>총 금액: {prduct_price}원</div> */}
      <Price>총 금액: {totalPrice.toLocaleString()} 원</Price>

      {/* 구분 점선 */}
      <img src={line} style={{width: '100%'}} />

      <CardView>
        <CardInfo>
          <img
            onLoad={(event) => handleImageLoad(event)} // 이미지가 로드되면 handleImageLoad 호출
            style={{
              // position: "absolute", 19 30 38 60 9.5 15
              width: rotate ? "47.5px" : "75px", // 회전 여부에 따라 width와 height 변경
              height: rotate ? "75px" : "47.5px",
              transform: rotate ? "rotate(-90deg)" : "none", // 회전시키기
              marginLeft: rotate ? "17.5px" : "0",
            }}
            src={testMainCard.img}
          />
          <div>{testMainCard.name}</div>
        </CardInfo>
        <div onClick={onClickChangeCard}>다른카드 선택하기</div>
        <Bottom>
          {/* 결제 금액 넘겨 받아야 함 */}
          <Btn onClick={onClick}>{confirmAmount}원 결제하기</Btn>
          {/* text={'7,000원 결제하기'} color={'white'} onClick={onClick} /> */}
        </Bottom>
      </CardView>

      <Modal isOpen={isOpen} onClose={onClose}>
        <SelectModal>
          <div>결제 카드 선택</div>
          <SelectCardList onSelectCard={onSelectCard} />
        </SelectModal>
      </Modal>
    </Wrapper>
  );
};

export default Payment;
