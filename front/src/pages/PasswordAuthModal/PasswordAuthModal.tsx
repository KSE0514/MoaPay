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
} from "./PasswordAuthModal.styles";
import { PATH } from "../../constants/path";
import axios from "axios";
import { useAuthStore } from "../../store/AuthStore";
import apiClient from "../../axios";
interface PasswordAuthModalProps {
  endAuth: () => void; // endAuth는 반환값이 없는 함수임을 명시
  changeAuthMethod: () => void;
}
const PasswordAuthModal: React.FC<PasswordAuthModalProps> = ({
  endAuth,
  changeAuthMethod,
}) => {
  // const baseUrl = import.meta.env.VITE_BASE_URL;
  const {
    id,
    mode,
    isLoggedIn,
    setIsLoggedIn,
    accessToken,
    setAccessToken,
    setRefreshToken,
    phoneNumber,
    setMode,
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
  const [ment, setMent] = useState<string>(
    "결제를 위해\n비밀번호를 입력하세요."
  );

  /**
   * 비밀번호 입력
   */
  const handleKeypadClick = (value: string) => {
    if (value === "+") {
      changeAuthMethod();
    }

    if (value === "-") {
      // 비밀번호 삭제 로직
      if (!isDoubleCheck) {
        if (password.length > 0) {
          setPassword(password.slice(0, -1)); // 마지막 문자를 삭제
        }
      } else {
        if (doubleCheckPassword.length > 0) {
          setDoubleCheckPassword(doubleCheckPassword.slice(0, -1)); // 마지막 문자를 삭제
        }
      }
      return;
    }

    // 실제로 비밀번호에 입력될 숫자 처리
    if (!isDoubleCheck) {
      if (password.length < 6) {
        setPassword((prev) => prev + value); // 비밀번호 6자리까지 입력
      }
    } else {
      if (doubleCheckPassword.length < 6) {
        setDoubleCheckPassword((prev) => prev + value); // 비밀번호 6자리까지 입력
      }
    }

    // 다른 랜덤한 번호 선택 (비밀번호 입력에는 영향 없음)
    const remainingKeys = keyPads.filter(
      (key) => key !== value && key !== "-" && key !== "+"
    );
    const randomKey =
      remainingKeys[Math.floor(Math.random() * remainingKeys.length)];

    // 버튼에 active 클래스 추가 (시각적 효과만)
    const buttonElement = document.querySelector(`button[data-key="${value}"]`);
    const randomButtonElement = document.querySelector(
      `button[data-key="${randomKey}"]`
    );

    if (buttonElement) buttonElement.classList.add("active");
    if (randomButtonElement) randomButtonElement.classList.add("active");

    // 일정 시간 후 active 클래스 제거 (200ms 후 제거)
    setTimeout(() => {
      if (buttonElement) buttonElement.classList.remove("active");
      if (randomButtonElement) randomButtonElement.classList.remove("active");
    }, 200);
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
            const response = await apiClient.post(
              // `${baseUrl}moapay/member/simple/verify`,
              // `https://j11c201.p.ssafy.io/api/moapay/member/simple/verify`,
              `/api/moapay/member/simple/verify`,
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
              changeAuthMethod();
              endAuth();
            }
          } catch (error) {
            // 비밀번호가 일치하지 않는 경우
            suffleKeysPad();
            setMent(
              "일치하지 않는 비밀번호입니다.\n다시 비밀번호를 입력해주세요."
            );
            setPassword("");
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
            <button
              key={num}
              data-key={num}
              onClick={() => handleKeypadClick(num)}
            >
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

export default PasswordAuthModal;
