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
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";

interface JoinUserInfo {
  name: string;
  phone_number: string;
  birth_date: string;
  gender: string;
  telecom: string;
  email: string;
  address: string;
  verification_code: string;
}

const CreateAccount = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUserInfo } = useAuthStore();
  const [isAuth, setIsAuth] = useState<boolean>(false); //인증 여부
  const [beforeStarting, setBeforeStarting] = useState<boolean>(true);
  const [btnMent, setBtnMent] = useState<string>("인증번호 받기");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  const [authSent, setAuthSent] = useState<boolean>(false); // 인증번호가 발급되었는지 여부
  const [joinUserInfo, setjoinUserInfo] = useState<JoinUserInfo>({
    name: "",
    phone_number: "",
    birth_date: "",
    gender: "",
    telecom: "",
    email: "",
    address: "",
    verification_code: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // 입력 필드 값 업데이트
    setjoinUserInfo({
      ...joinUserInfo,
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
   * 날짜 데이터 포맷
   */
  function formatBirthDate(birthDate: string) {
    // 앞 두 자리 연도
    const year =
      parseInt(birthDate.slice(0, 2), 10) < 50
        ? `20${birthDate.slice(0, 2)}` // 2000년대 출생자
        : `19${birthDate.slice(0, 2)}`; // 1900년대 출생자

    // 월과 일 추출
    const month = birthDate.slice(2, 4);
    const day = birthDate.slice(4, 6);

    // yyyy-MM-dd 형식으로 반환
    return `${year}-${month}-${day}`;
  }

  /**
   * 유효성검사
   */
  const validateFields = () => {
    let errors = {};
    // 필수 입력 항목 체크
    if (
      !joinUserInfo.name ||
      joinUserInfo.name.length < 2 ||
      joinUserInfo.name.length > 14
    )
      errors = { ...errors, name: true };
    if (!joinUserInfo.birth_date || joinUserInfo.birth_date.length !== 6)
      errors = { ...errors, birth_date: true };
    if (
      !joinUserInfo.gender ||
      joinUserInfo.gender.length !== 1 ||
      !/^\d+$/.test(joinUserInfo.gender)
    )
      errors = { ...errors, gender: true };
    if (!joinUserInfo.telecom) errors = { ...errors, telecom: true };
    if (
      !joinUserInfo.phone_number ||
      joinUserInfo.phone_number.length !== 11 ||
      !/^\d+$/.test(joinUserInfo.phone_number)
    )
      errors = { ...errors, phone_number: true };

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  /**
   * 1. 인증번호 받아오기
   */
  const getAuthNumber = async () => {
    if (!validateFields()) {
      return; // 유효성 검사 통과하지 못하면 중단
    }
    // 인증번호 발급하기
    try {
      await axios.post(`http://localhost:18040/payment/member/sendSMS`, {
        phoneNumber: joinUserInfo.phone_number,
      });
      setAuthSent(true); // 인증번호 발급됨
      setBtnMent("인증번호 재발송");
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * 2. 인증번호 확인 후 존재하는 유저인지 판단
   */

  const checkUser = async () => {
    // 유효성 검사 통과하지 못한 경우
    if (!validateFields()) {
      return;
    }
    try {
      //인증번호 확인하기
      const response = await axios.post(
        `http://localhost:18040/payment/member/verification`,
        {
          phoneNumber: joinUserInfo.phone_number,
          code: joinUserInfo.verification_code,
        }
      );
      //인증번호가 일치하면 존재하는 멤버인지 확인해야함
      if (response.status == 200) {
        //요청 결과에 따라 비밀번호 로그인 또는 회원가입으로 전달
        const existUserCheckResponse = await axios.post(``, {});
        //회원이 없는 경우
        if (existUserCheckResponse.data) {
          //회원가입
          setIsAuth(true);
        } else {
          navigate(PATH.PASSWORD_LOGIN, {
            state: {
              ment: `앱을 켜려면\n비밀번호를 눌러주세요`,
              back: false,
              mode: "NewLogin",
            },
          });
        }
      }
    } catch (e) {
      if (e.response.status == 400) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          verification_code: true, // verification_code 필드에 오류 상태 추가
        }));
      }
      //인증번호가 틀린 경우 - 인증번호 다시 입력하도록 함
    }

    //test - 회원가입
    // setIsAuth(true);

    //test - 계정이 있는 경우
    // navigate(PATH.PASSWORD_LOGIN, {
    //   state: {
    //     ment: `앱을 켜려면\n비밀번호를 눌러주세요`,
    //     back: false,
    //     mode: "NewLogin",
    //   },
    // });
  };

  /**
   * 3. 회원가입
   */
  const join = async () => {
    //회원 가입 요청 보내기
    try {
      const response = await axios.post(
        `http://localhost:18040/payment/member/join`,
        {
          name: joinUserInfo.name,
          birthDate: formatBirthDate(joinUserInfo.birth_date),
          gender: Number(joinUserInfo.gender), //1~4로 넘겨주면 F,M 판단해서 db에 넣기
          phoneNumber: joinUserInfo.phone_number,
          email: joinUserInfo.email,
          address: joinUserInfo.address,
        }
      );
      if (response.status == 200) {
        //로그인 상태로 변경하기
        localStorage.setItem("hasLoggedInBefore", "true");
        setIsLoggedIn(true);
        setUserInfo(response.data.id, response.data.name);
        // 응답 받으면 생체인식 설정으로 이동시키기
        navigate(PATH.PASSWORD_LOGIN, {
          state: {
            ment: `간편 비밀번호를\n입력해주세요`,
            back: false,
            mode: "Join",
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
    //test
    // localStorage.setItem("hasLoggedInBefore", "true");
    // navigate(PATH.PASSWORD_LOGIN, {
    //   state: {
    //     ment: `간편 비밀번호를 설정합니다.\n 6자리 비밀번호를 입력해주세요`,
    //     back: false,
    //     mode: "Join",
    //   },
    // });
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
                value={joinUserInfo.name}
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
                value={joinUserInfo.birth_date}
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
                  value={joinUserInfo.gender}
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
                value={joinUserInfo.telecom}
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
                value={joinUserInfo.phone_number}
                onChange={handleChange}
                disabled={authSent}
                style={{
                  borderColor: validationErrors.phone_number ? "red" : "",
                }}
              />
            </div>

            {!isAuth && (
              <div>
                {validationErrors.verification_code && (
                  <p style={{ width: "50%" }} className="error">
                    잘못된 인증번호입니다.
                  </p>
                )}
                <div className="form-row auth-btn">
                  <input
                    value={joinUserInfo.verification_code}
                    type="text"
                    placeholder="인증번호"
                    name="verification_code"
                    onChange={handleChange}
                  />
                  <button onClick={getAuthNumber}>{btnMent}</button>
                </div>
              </div>
            )}
            {isAuth && (
              <>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="이메일"
                    name="email"
                    value={joinUserInfo.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="주소"
                    name="address"
                    value={joinUserInfo.address}
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
