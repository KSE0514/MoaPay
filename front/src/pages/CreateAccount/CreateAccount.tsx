import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  BoldText,
  Header,
  MessageAuthenticationForm,
  Wrapper,
  LogoView,
} from "./CreateAccount.styles";
import { PATH } from "../../constants/path";

interface JoinUserInfo {
  name: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  telecom: string;
  email: string;
  address: string;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [beforeStarting, setBeforeStarting] = useState<boolean>(true);
  const [btnMent, setBtnMent] = useState<string>("인증번호 받기");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const [authSent, setAuthSent] = useState<boolean>(false); // 인증번호가 발급되었는지 여부
  const [userInfo, setUserInfo] = useState<JoinUserInfo>({
    name: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    telecom: "",
    email: "",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // 입력 필드 값 업데이트
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    // 만약 해당 필드가 validationErrors에 존재한다면 errors에서 제거
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors; // name 필드를 제외한 나머지 오류만 유지
        return rest;
      });
    }
  };

  /**
   * 유효성검사
   */
  const validateFields = () => {
    let errors = {};
    // 필수 입력 항목 체크
    if (!userInfo.name || userInfo.name.length < 2 || userInfo.name.length > 14)
      errors = { ...errors, name: true };
    if (!userInfo.birth_date || userInfo.birth_date.length !== 6)
      errors = { ...errors, birth_date: true };
    if (
      !userInfo.gender ||
      userInfo.gender.length !== 1 ||
      !/^\d+$/.test(userInfo.gender)
    )
      errors = { ...errors, gender: true };
    if (!userInfo.telecom) errors = { ...errors, telecom: true };
    if (
      !userInfo.phone_number ||
      userInfo.phone_number.length !== 11 ||
      !/^\d+$/.test(userInfo.phone_number)
    )
      errors = { ...errors, phone_number: true };

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * 존재하는 유저인지 판단
   */
  const checkUser = () => {
    if (!validateFields()) {
      return; // 유효성 검사 통과하지 못하면 중단
    }
    //회원 여부 판단 요청

    //요청 결과에 따라 비밀번호 로그인 또는 회원가입으로 전달
    if (true) {
      //회원가입
      setIsAuth(true);
    } else {
      navigate(PATH.PASSWORD_LOGIN, {
        state: {
          ment: `앱을 켜려면\n비밀번호를 눌러주세요`,
          back: false,
          mode: "Login",
        },
      });
    }
  };

  /**
   * 인증번호 받아오기
   */
  const getAuthNumber = () => {
    if (!validateFields()) {
      return; // 유효성 검사 통과하지 못하면 중단
    }

    // 인증번호 발급하기
    setAuthSent(true); // 인증번호 발급됨
    setBtnMent("인증번호 재발송");
  };

  /**
   * 회원가입
   */
  const join = () => {
    //인증 번호가 일치하는지 확인 - 일치하지않으면 오류
    //회원 가입 요청 보내기
    //응답 받으면 생체인식 설정으로 이동시키기
    // navigate(PATH.PASSWORD_LOGIN, {
    //   state: {
    //     ment: `간편 비밀번호를\n입력해주세요`,
    //     back: false,
    //     mode: "Join",
    //   },
    // });
    navigate(PATH.SETTING_BIOMETRICS_LOGIN);
  };

  return (
    <Wrapper>
      {beforeStarting ? (
        <LogoView>
          <div>MoA Pay</div>
          <button
            onClick={() => {
              setBeforeStarting(false);
            }}>
            시작하기
          </button>
        </LogoView>
      ) : (
        <MessageAuthenticationForm className={beforeStarting ? "" : "fade-in"}>
          {isAuth ? (
            <Header>
              회원가입을 위해
              <br />
              <BoldText>추가정보</BoldText>를 입력해주세요
            </Header>
          ) : (
            <Header>
              MoA Pay 이용을 위해
              <br />
              <BoldText>본인확인</BoldText>을 진행해주세요
            </Header>
          )}
          <Form>
            {validationErrors.name && (
              <p className="error">이름은 2자 이상 14자 이하여야 합니다.</p>
            )}
            <div className="form-row">
              <input
                maxLength={14}
                type="text"
                placeholder="이름"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                disabled={authSent}
                style={{
                  borderColor: validationErrors.name ? "red" : "",
                }}
              />
            </div>
            <div style={{ display: "flex" }}>
              {validationErrors.birth_date && (
                <p style={{ width: "50%" }} className="error">
                  생년월일은 6자리여야 합니다.
                </p>
              )}
              {validationErrors.gender && (
                <p style={{ width: "50%" }} className="error">
                  올바른 숫자를 입력하세요
                </p>
              )}
            </div>
            <div className="form-row birth">
              <input
                type="text"
                placeholder="생년월일"
                name="birth_date"
                value={userInfo.birth_date}
                onChange={handleChange}
                disabled={authSent}
                style={{
                  borderColor: validationErrors.birth_date ? "red" : "",
                }}
              />
              <div>
                <div className="line"></div>
                <input
                  type="text"
                  name="gender"
                  value={userInfo.gender}
                  onChange={handleChange}
                  disabled={authSent}
                  style={{
                    borderColor: validationErrors.gender ? "red" : "",
                  }}
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
            {validationErrors.telecom && (
              <p className="error">통신사를 선택하세요.</p>
            )}
            <div className="form-row">
              <select
                name="telecom"
                value={userInfo.telecom}
                onChange={handleChange}
                disabled={authSent}
                style={{
                  borderColor: validationErrors.telecom ? "red" : "",
                }}>
                <option value="" disabled>
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
            {validationErrors.phone_number && (
              <p className="error">올바른 전화번호를 입력하세요.</p>
            )}
            <div className="form-row">
              <input
                type="text"
                placeholder="전화번호"
                name="phone_number"
                value={userInfo.phone_number}
                onChange={handleChange}
                disabled={authSent}
                style={{
                  borderColor: validationErrors.phone_number ? "red" : "",
                }}
              />
            </div>

            {!isAuth && (
              <div className="form-row auth-btn">
                <input
                  type="text"
                  placeholder="인증번호"
                  name="verification_code"
                  onChange={handleChange}
                />
                <button onClick={getAuthNumber}>{btnMent}</button>
              </div>
            )}
            {isAuth && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="이메일"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="주소"
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <button
              className={isAuth ? "join-btn" : "ready-btn"}
              onClick={isAuth ? join : checkUser}>
              {isAuth ? "회원가입" : "확인"}
            </button>
          </Form>
        </MessageAuthenticationForm>
      )}
    </Wrapper>
  );
};

export default CreateAccount;
