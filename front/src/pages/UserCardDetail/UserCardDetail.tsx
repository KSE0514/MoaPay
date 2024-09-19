import backImg from "./../../assets/image/card_detail_back.png"
import bottomGD from "./../../assets/image/card_detail_bottom.png"
import testCard12 from "./../../assets/image/cards/신용카드이미지/12_올바른_FLEX_카드.png"
import DetailPayLogList from "../../components/card/DetailPayLogList/DetailPayLogList"

import {
  Wrapper,
  BackImg,
  Top,
  Month,
  CardInfo,
  Main,
  Bottom,
} from "./UserCardDetail.styles"

const UserCardDetail = () => {

  // 테스트용 카드 데이터--- 나중에 지울 예정
  const card = {
    img: testCard12,
    name: "올바른 FLEX 카드",
    cur_record: 253200,
    tar_record: 3000000,
    benefit: 5600,
  }


  return (
    <Wrapper>
      <BackImg>
        <img src={backImg} />
      </BackImg>
      <Top>
        <Month>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
          </button>
          <div>8월</div>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </Month>
        <CardInfo>
          {/* 카드 번호로 카드 이미지 및 정보 불러오기 */}
          <img src={card.img} />
          <div>
            <div>{card.name}</div>
            {/* [미완] 현재까지 실적/채워야할 실적 */}
            <div>실적: {card.cur_record} / {card.tar_record}</div>
            <div>혜택: {card.benefit}원</div>
          </div>
        </CardInfo>
      </Top>
      <Main>
        <DetailPayLogList />
      </Main>
      <Bottom>
        <img src={bottomGD} />
      </Bottom>
    </Wrapper>
  );
};
export default UserCardDetail;
