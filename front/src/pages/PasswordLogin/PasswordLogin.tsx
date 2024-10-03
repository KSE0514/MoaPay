import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faArrowLeft,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  KeyPad,
  Ment,
  PasswordView,
  Wrapper,
  Nav,
  Container,
} from "./PasswordLogin.styles";
import { PATH } from "../../constants/path";
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";

const PasswordLogin: React.FC = () => {
  // const baseUrl = import.meta.env.VITE_BASE_URL;
  const baseUrl = `http://localhost:18040/`;
  const {
    id,
    mode,
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setAccessToken,
    setRefreshToken,
    phoneNumber,
  } = useAuthStore();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(""); // 입력한 비밀번호
  const [doubleCheckPassword, setDoubleCheckPassword] = useState<string>(""); //2차 검증 비밀번호
  const [isDoubleCheck, setIsDoubleCheck] = useState<boolean>(false);
  const [isChangeMode, setIsChangeMode] = useState<boolean>(false);
  const [keyPads, setKeyPads] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "+",
  ]);
  const [ment, setMent] = useState<string>("");
  useEffect(() => {
    if (mode === "" || mode === "NewLogin") {
      setMent("로그인을 위해\n비밀번호를 입력하세요.");
    } else if (mode === "Join") {
      setMent("비밀번호를 설정합니다.\n6자리를 입력하세요.");
    }
  }, []);
  /**
   * 비밀번호 입력
   */
  const handleKeypadClick = (value: string) => {
    if (value == "+") {
      if (mode != "Join" && mode != "NewLogin") {
        navigate(PATH.BIOMETRICS_LOGIN);
      } else {
        return;
      }
    }
    if (value == "-") {
      if (!isDoubleCheck)
        setPassword(password.slice(0, -1)); //startIndex에서 endIndex전까지
      else setDoubleCheckPassword(doubleCheckPassword.slice(0, -1));
    } else {
      if (!isDoubleCheck) {
        if (password.length < 6) {
          setPassword((prev) => prev + value); // 비밀번호 6자리까지 입력
        }
      } else {
        if (doubleCheckPassword.length < 6) {
          setDoubleCheckPassword((prev) => prev + value); // 비밀번호 6자리까지 입력
        }
      }
    }
  };

  /**
   * 키패드 숫자 랜덤화
   */
  const suffleKeysPad = () => {
    const shuffledKeys = keyPads
      .filter((key) => key !== "-" && key !== "+") // "-"와 "+"를 제외
      .sort(() => Math.random() - 0.5); // 랜덤으로 섞기

    // "+"는 10번째 (9번 인덱스), "-"는 12번째 (11번 인덱스)에 고정
    const finalKeyPads = [
      ...shuffledKeys.slice(0, 9), // 처음 9개 섞인 값
      "+", // 10번째 자리
      ...shuffledKeys.slice(9), // 나머지 섞인 값
      "-", // 12번째 자리
    ];
    setKeyPads(finalKeyPads);
  };

  /**
   * 비밀번호를 전부 입력 후
   */
  useEffect(() => {
    // 비동기 로직을 처리할 함수 정의
    const verifyPassword = async () => {
      if (password.length === 6) {
        if (mode === "") {
          console.log("verifty password");
          console.log(password);
          try {
            // 비밀번호 확인 요청
            const response = await axios.post(
              // `${baseUrl}moapay/member/simple/verify`,
              `moapay/member/simple/verify`,
              {
                uuid: id,
                simplePassword: password,
              },
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            console.log(response);
            // 요청 성공 시 홈으로 이동
            if (response.status === 200) {
              navigate(PATH.HOME);
            }
          } catch (error) {
            // 비밀번호가 일치하지 않는 경우
            suffleKeysPad();
            setMent(
              "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
            );
            setPassword("");
          }
        } else if (mode === "NewLogin") {
          console.log("login password");
          console.log(password);
          try {
            const response = await axios.post(
              // `${baseUrl}moapay/member/login`,
              `moapay/member/login`,
              {
                uuid: id,
                phoneNumber: phoneNumber,
                simplePassword: password,
              },
              {
                withCredentials: true,
              }
            );
            if (response.status == 200) {
              setAccessToken(response.data.data.token.accessToken);
              setRefreshToken(response.data.data.token.refreshToken);
              setIsLoggedIn(true);
              navigate(PATH.SETTING_BIOMETRICS_LOGIN);
            }
          } catch (e) {
            suffleKeysPad();
            setMent(
              "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
            );
            setPassword("");
          }
        } else if (mode === "Pay") {
          if (true) {
            // 결제 로직 처리
          } else {
            suffleKeysPad();
            setMent(
              "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
            );
            setPassword("");
          }
        } else if (mode === "Join") {
          suffleKeysPad();
          setIsDoubleCheck(true);
          setMent("다시 비밀번호를 입력해주세요.");
        } else if (mode === "SettingPassword") {
          if (!isChangeMode) {
            if (true) {
              setIsChangeMode(true);
              setPassword("");
              setMent("새로운 비밀번호를\n입력해주세요.");
            } else {
              suffleKeysPad();
              setMent(
                "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
              );
              setPassword("");
            }
          } else {
            suffleKeysPad();
            setIsDoubleCheck(true);
            setMent("다시 비밀번호를 입력해주세요.");
          }
        }
      }
    };

    // 비동기 함수 호출
    verifyPassword();
  }, [password]);

  /**
   * 비밀번호 2차 검증 - 비밀번호 변경과 비밀번호 첫 설정
   */
  useEffect(() => {
    const handlePasswordCheck = async () => {
      if (isDoubleCheck && doubleCheckPassword.length === 6) {
        if (String(doubleCheckPassword).trim() === String(password).trim()) {
          //비밀번호 설정 후 저장 요청보내기
          //단 Join일때와 SettingPassword일때는 다른 요청을 보내야한다.
          if (mode == "Join") {
            try {
              console.log("here join password");
              console.log(password);
              //생체정보 설정을 위해 이동 - 선택 가능
              const response = await axios.post(
                // `${baseUrl}moapay/member/simple/register`,
                `moapay/member/simple/register`,
                {
                  uuid: id,
                  simplePassword: password,
                },
                {
                  withCredentials: true,
                  headers: {
                    Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
                  },
                }
              );
              if (response.status == 200) {
                navigate(PATH.SETTING_BIOMETRICS_LOGIN);
              }
            } catch (error) {
              console.error("Error during password setting:", error);
            }
          } else if (mode == "SettingPassword") {
            // "SettingPassword"에 대한 비동기 처리 추가 가능
          }
        } else {
          suffleKeysPad();
          setMent(
            "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
          );
          setDoubleCheckPassword("");
        }
      }
    };

    handlePasswordCheck();
  }, [doubleCheckPassword]);

  // state 업데이트
  useEffect(() => {
    suffleKeysPad();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Ment>
          {ment.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Ment>
        <PasswordView>
          {/* 비밀번호 자리 표시, 입력된 자리만 표시되도록 */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={
                index <
                (isDoubleCheck
                  ? doubleCheckPassword?.length || 0
                  : password.length)
                  ? "full"
                  : ""
              }
            >
              <FontAwesomeIcon
                style={{ width: "30px", height: "30px" }}
                icon={faAsterisk}
              />
            </div>
          ))}
        </PasswordView>
        <KeyPad>
          {keyPads.map((num) => (
            <button key={num} onClick={() => handleKeypadClick(num)}>
              {num === "-" ? (
                <FontAwesomeIcon icon={faArrowLeft} />
              ) : mode !== "Join" && num === "+" ? (
                <FontAwesomeIcon icon={faFingerprint} />
              ) : mode === "Join" && num === "+" ? null : (
                num
              )}
            </button>
          ))}
        </KeyPad>
      </Container>
    </Wrapper>
  );
};

export default PasswordLogin;
