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

const PasswordLogin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { back, mode } =
    (location.state as {
      mode: string;
      back: boolean;
    }) || {};
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
  const [ment, setMent] = useState<string>(
    location.state.ment || "비밀번호를 입력하세요"
  );

  /**
   * 비밀번호 입력
   */
  const handleKeypadClick = (value: string) => {
    if (value == "+") {
      if (mode != "Join" || mode != "NewLogin") {
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
    if (password.length === 6) {
      if (mode === "Login") {
        //비밀번호 일치 시 로그인 시키고 홈으로 이동
        if (true) {
          navigate(PATH.HOME);
        }
        //일치안할경우
        else {
          suffleKeysPad();
          setMent(
            "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
          );
          setPassword("");
        }
      } else if (mode === "NewLogin") {
        //비밀번호 일치 시 로그인 시키고 홈으로 이동
        if (true) {
          navigate(PATH.SETTING_BIOMETRICS_LOGIN, {
            state: { mode: "NewLogin" },
          });
        }
        //일치안할경우
        else {
          suffleKeysPad();
          setMent(
            "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
          );
          setPassword("");
        }
      } else if (mode === "Pay") {
        // 비밀번호 일치 시 결제로 이동
        if (true) {
        }
        // 비밀번호 비 일치 시 재 입력
        else {
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
      } else if (mode == "SettingPassword") {
        if (!isChangeMode) {
          //비밀번호 일치 할 경우 변경시작
          if (true) {
            setIsChangeMode(true);
            setPassword("");
            setMent("새로운 비밀번호를\n입력해주세요.");
          }
          //비밀번호가 틀린 경우 재 입력
          else {
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
  }, [password]);

  /**
   * 비밀번호 2차 검증 - 비밀번호 변경과 비밀번호 첫 설정
   */
  useEffect(() => {
    if (isDoubleCheck && doubleCheckPassword.length === 6) {
      console.log(password + " " + doubleCheckPassword);
      if (doubleCheckPassword === password) {
        //비밀번호 설정 후 저장 요청보내기
        //단 Join일때와 SettingPassword일때는 다른 요청을 보내야한다.
        if (mode == "Join") {
          console.log("hello");
          //생체정보 설정을 위해 이동 - 선택 가능
          navigate(PATH.SETTING_BIOMETRICS_LOGIN, { state: { mode: "Join" } });
        } else if (mode == "SettingPassword") {
        }
      } else {
        suffleKeysPad();
        setMent("일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요.");
        setDoubleCheckPassword("");
      }
    }
  }, [doubleCheckPassword]);

  // state 업데이트
  useEffect(() => {
    suffleKeysPad();
  }, []);

  return (
    <Wrapper>
      <Nav>
        {back && (
          <button onClick={() => window.history.back()}>뒤로가기</button>
        )}
      </Nav>
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
              }>
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
