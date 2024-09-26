import { useEffect, useState } from "react";
import { SelectView, Story, Wrapper } from "./SelectType.styles";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useAuthStore } from "../../store/AuthStore";

const SelectType = () => {
  const navigate = useNavigate();
  const { isLoggedIn, Login } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    Login: state.Login,
  }));

  const [isLoading, setIsLoading] = useState(true);
  const SettingType = (type: string) => {
    //요청보내기
    try {
      axios.post(``, { type }, { withCredentials: true });
      navigate(PATH.HOME);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      Login();
    }
  }, []);
  return (
    <Wrapper>
      {isLoading ? (
        <Story></Story>
      ) : (
        <SelectView>
          <div
            onClick={() => {
              SettingType("benefit");
            }}
          >
            혜택형
          </div>
          <div
            onClick={() => {
              SettingType("perform");
            }}
          >
            실적형
          </div>
        </SelectView>
      )}
    </Wrapper>
  );
};
export default SelectType;

//로그인한 적이 없는경우 - 회원가입 후 설정이기에 로그인처리하고 홈으로 이동
//로그인한 적이 있는 경우 - 설정 페이지에서 설정임
