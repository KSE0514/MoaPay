import { act, useEffect, useState } from "react";
import { EndButton, SelectView, Wrapper } from "./SelectType.styles";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAuthStore } from "../../store/AuthStore";

const SelectType = () => {
  // const baseUrl = import.meta.env.VITE_BASE_URL;
  const baseUrl = `http://localhost:18040/`;
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState<string | null>(null);
  const { id, accessToken, isLoggedIn, Login, mode, setPaymentType } =
    useAuthStore();
  // const { isLoggedIn, Login } = useAuthStore((state) => ({
  //   isLoggedIn: state.isLoggedIn,
  //   Login: state.Login,
  // }));

  const SettingType = (type: string) => {
    setSelectType(type);
  };
  const addType = async () => {
    //요청보내기
    try {
      const response = await axios.post(
<<<<<<< HEAD
        `${baseUrl}moapay/member/selectType`,
        // `api/moapay/member/selectType`,
=======
        // `${baseUrl}moapay/member/selectType`,
        `/api/moapay/member/selectType`,
>>>>>>> 89fa19b066e686a6d69d74d3e66a7098664358ed
        { type: selectType, uuid: id },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          },
        }
      );
      if (response?.status == 200) {
        setPaymentType(selectType !== null ? selectType : "");
        if (mode === "Join") {
          navigate(PATH.BRING_CARD);
        } else {
          navigate(PATH.HOME);
        }
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <p>
        카드 결제 시 <span>우선순위를</span> <br /> 무엇으로 고려해
        결제해드릴까요?
      </p>

      <SelectView>
        <button
          onClick={() => {
            SettingType("benefit");
          }}
        >
          혜택형
        </button>
        <button
          onClick={() => {
            SettingType("perform");
          }}
        >
          실적형
        </button>
      </SelectView>

      <EndButton onClick={addType}>확인</EndButton>
    </Wrapper>
  );
};
export default SelectType;

//로그인한 적이 없는경우 - 회원가입 후 설정이기에 로그인처리하고 홈으로 이동
//로그인한 적이 있는 경우 - 설정 페이지에서 설정임
