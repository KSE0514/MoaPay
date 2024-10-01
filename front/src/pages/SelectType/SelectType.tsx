import { act, useEffect, useState } from "react";
import { SelectView, Story, Wrapper } from "./SelectType.styles";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAuthStore } from "../../store/AuthStore";

const SelectType = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const baseUrl1 = `http://localhost:18040/`;
  const navigate = useNavigate();
  const { id, accessToken, isLoggedIn, Login, mode } = useAuthStore();
  // const { isLoggedIn, Login } = useAuthStore((state) => ({
  //   isLoggedIn: state.isLoggedIn,
  //   Login: state.Login,
  // }));

  const SettingType = async (type: string) => {
    //요청보내기
    try {
      const response = await axios.post(
        `${baseUrl1}moapay/member/selectType`,
        { type: type, uuid: id },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          },
        }
      );
      if (response?.status == 200) {
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
      <div>
        <Story></Story>
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
      </div>
    </Wrapper>
  );
};
export default SelectType;

//로그인한 적이 없는경우 - 회원가입 후 설정이기에 로그인처리하고 홈으로 이동
//로그인한 적이 있는 경우 - 설정 페이지에서 설정임
