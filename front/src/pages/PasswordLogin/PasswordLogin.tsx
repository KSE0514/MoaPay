import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAsterisk,
  faArrowLeft,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {
  KeyPad,
  Ment,
  PasswordView,
  Wrapper,
  Nav,
  Container,
} from "./PasswordLogin.styles";
import {PATH} from "../../constants/path";

const PasswordLogin: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { back, mode } =
    (location.state as {
      mode:string;
      back: boolean;
    }) || {};
  const [password, setPassword] = useState<string>(""); // 입력한 비밀번호
  const [doubleCheckPassword, setDoubleCheckPassword] = useState<string>(""); //2차 검증 비밀번호
  const [isDoubleCheck,setIsDoubleCheck] = useState<boolean>(false);
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
   const [ment, setMent] = useState<string>(location.state.ment || "비밀번호를 입력하세요"); 

  /**
   * 비밀번호 입력
   */
  const handleKeypadClick = (value: string) => {
    if (value == "-") {
      if(!isDoubleCheck)
        setPassword(password.slice(0, -1)); //startIndex에서 endIndex전까지
      else
        setDoubleCheckPassword(doubleCheckPassword.slice(0,-1));
    } else {
      if(!isDoubleCheck){
        if (password.length < 6) {
          setPassword((prev) => prev + value); // 비밀번호 6자리까지 입력
        }
      }
      else{
        if (doubleCheckPassword.length < 6) {
          setDoubleCheckPassword((prev) => prev + value); // 비밀번호 6자리까지 입력
        }
      }
    }
  };

  /**
   * 키패드 숫자 랜덤화
   */
  useEffect(() => {
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

    // state 업데이트
    setKeyPads(finalKeyPads);
  }, []);

  /**
   * 비밀번호를 전부 입력 후
   */
  useEffect(() => {
    if (password.length == 6) {
      if (mode == "Login") {
        //비밀번호 유효성 검사 후 home으로 이동
        navigate("/home");
      } else if (mode == "Pay") {
        //결제로 이동
      } else if (mode == "Join") {
          //2차검증
          setIsDoubleCheck(true);
          setMent("다시 비밀번호를 입력해주세요.")
          if(isDoubleCheck&&doubleCheckPassword.length==6){
            if(doubleCheckPassword.length==6){
              if(doubleCheckPassword===password){
                //완료 모달 띄우기
                navigate(PATH.HOME);
              }else{
                setMent("일치하지않은 비밀번호입니다.\n다시 비밀번호를 입력해주세요.");
                setDoubleCheckPassword("");
              }
            }
          }
      } else if (mode == "SettingPassword") {
        //비밀번호 변경시작
      }
    }
    
  }, [password,doubleCheckPassword]);
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
              className={index < (isDoubleCheck ? (doubleCheckPassword?.length || 0) : password.length) ? "full" : ""}
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
              ) : num === "+" ? (
                <FontAwesomeIcon icon={faFingerprint} />
              ) : (
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
