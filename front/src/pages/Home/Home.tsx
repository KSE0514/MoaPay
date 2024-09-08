import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat,faBars,faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Top,
  Bottom,
  BarcordArea,
  Barcord,
  Time,
  ButtonArea,
  Wrapper,
  CardList,PlusIcon
} from "./Home.styles";
import barcode from "../../assets/image/barcode.png"
import { useEffect, useState } from "react";
const Home = () => {
  const [cardList,setCardList] = useState<string[]>([]);
  //카드 정보 받아오기
  useEffect(()=>{
    setCardList(["null","/src/assets/image/card.png","/src/assets/image/cards/신용카드이미지/100_신한카드_Air_One.png","/src/assets/image/cards/신용카드이미지/10_신한카드_Deep_Oil.png"]);
  },[]);
  return (
    <Wrapper>
      <Top>
        <BarcordArea>
          <Barcord>
            <img src={barcode} alt="barcode" />
          </Barcord>
          <Time>
            <div>2:04</div>
            <button>
              <FontAwesomeIcon icon={faRepeat} />
            </button>
          </Time>
        </BarcordArea>
        <ButtonArea>
          <button>QR 인식하기</button>
          <button>결제코드 입력하기</button>
        </ButtonArea>
      </Top>
      <Bottom>
        <div className="edit-card">
          <FontAwesomeIcon icon={faBars} />
          <p>편집</p>
        </div>
        <CardList>      
          {
           cardList.map((card, index) => (
            card=="null"?(
              <div>
                <div>
                  <PlusIcon icon={faPlus} />
                </div>
                <p>카드 등록하기</p>
              </div>
              ):
              (<img src={card}/>)
          ))}
        </CardList>
        <div className="remaining-performance">다음 실적까지 100,000원</div>
        <div className="tri tri-left"></div>
        <div className="tri tri-right"></div>
      </Bottom>
    </Wrapper>
  );
};
export default Home;
