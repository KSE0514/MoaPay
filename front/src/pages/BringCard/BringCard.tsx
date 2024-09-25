import { useState } from "react";
import { Button, Title, Wrapper } from "./BringCard.styles";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAuthStore } from "../../store/AuthStore";
import { useCardStore } from "../../store/CardStore";

const BringCard = () => {
  const { cardList, setCardList } = useCardStore();
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [before, setBefore] = useState(true);
  const bringCard = async () => {
    setIsLoding(true);
    //카드 데이터 가져오기
    try {
      const response = await axios.get(
        `http://localhost:18020/moapay/core/card/mycard`,
        { withCredentials: true }
      );
      //로딩상태 풀고 카드 선택 뷰 보이도록 설정
      setCardList(response.data);
      //추가
      setIsLoding(false);
      setBefore(false);
    } catch (e) {
      const error = e as AxiosError; // AxiosError로 타입 단언
      console.log(error);
    }
  };
  const settingCard = () => {
    //카드 등록 요청 보내기
    // await axios.post(``, { cardList });
    navigate(PATH.HOME);
  };
  return (
    <Wrapper>
      {isLoding ? (
        <>
          <div>Loding...</div>
        </>
      ) : (
        <>
          {before ? (
            <>
              <Title>카드를 불러오겠습니까?</Title>
              <Button onClick={bringCard}>불러오기</Button>
            </>
          ) : (
            <>
              <Title>등록할 카드를 설정해주세요</Title>
              <Button onClick={settingCard}>등록하기</Button>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default BringCard;
