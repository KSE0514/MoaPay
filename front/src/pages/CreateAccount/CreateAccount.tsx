import { useState } from "react";
import {
  Form,
  BoldText,
  Header,
  MessageAuthenticationForm,
  Wrapper,
} from "./CreateAccount.styles";

interface JoinUserInfo {
  name: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  email: string;
  address: string;
}

const CreateAccount = () => {
  // 문자인증여부 판단
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [btnMent, setBtnMent] = useState<string>("인증번호 받기");
  const [userInfo, setUserInfo] = useState<JoinUserInfo>({
    name: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    email: "",
    address: "",
  });

  // input 값이 변경될 때마다 userInfo 업데이트
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const checkUser = () => {
    //회원 여부 판단 요청

    //요청 결과에 따라 비밀번호 로그인 또는 회원가입으로 전달
    if (true) {
      //회원가입
      setIsAuth(true);
    } else {
      //비밀번호 로그인으로 이동
    }
  };

  const join = () => {};

  return (
    <Wrapper>
      <MessageAuthenticationForm>
        {isAuth ? (
          <Header>
            회원가입을 위해
            <br />
            <BoldText>추가정보</BoldText>를 입력해주세요
          </Header>
        ) : (
          <Header>
            공주페이 이용을 위해
            <br />
            <BoldText>본인확인</BoldText>을 진행해주세요
          </Header>
        )}
        <Form>
          <div className="form-row">
            <input
              type="text"
              placeholder="이름"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="생년월일"
              name="birth_date"
              value={userInfo.birth_date}
              onChange={handleChange}
            />
            <div>
              <div className="line"></div>
              <input
                type="text"
                name="gender"
                value={userInfo.gender}
                onChange={handleChange}
              />
              <div className="masking-part">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <select name="telecom">
              <option value="" disabled selected>
                통신사를 선택해주세요
              </option>
              <option value="skt">SKT</option>
              <option value="kt">KT</option>
              <option value="lg">LG U+</option>
              <option value="skt_mvno">SKT 알뜰폰</option>
              <option value="kt_mvno">KT 알뜰폰</option>
              <option value="lg_mvno">LG U+ 알뜰폰</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="전화번호"
              name="phone_number"
              value={userInfo.phone_number}
              onChange={handleChange}
            />
          </div>
          {isAuth ? null : (
            <div className="form-row">
              <input
                type="text"
                placeholder="인증번호"
                name="verification_code"
                onChange={handleChange}
              />
              <button>{btnMent}</button>
            </div>
          )}
          {isAuth ? (
            <div className="form-row">
              <input
                type="text"
                placeholder="이메일"
                name="verification_code"
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
          ) : null}
          {isAuth ? (
            <div className="form-row">
              <input
                type="text"
                placeholder="주소"
                name="verification_code"
                value={userInfo.address}
                onChange={handleChange}
              />
            </div>
          ) : null}
          {isAuth ? (
            <button className="join-btn" onClick={join}>
              회원가입
            </button>
          ) : (
            <button className="ready-btn" onClick={checkUser}>
              확인
            </button>
          )}
        </Form>
      </MessageAuthenticationForm>
    </Wrapper>
  );
};

export default CreateAccount;
