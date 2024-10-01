import axios from "axios"; // axios 임포트
import { Button, Header, Wrapper } from "./BiometricsLogin.styles";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";

const BiometricsLogin = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const baseUrl1 = `http://localhost:18040/`;
  const navigate = useNavigate();
  const { name, accessToken, mode } = useAuthStore();
  const [error, setError] = useState<boolean>(false);

  // Base64 URL Safe 변환 함수
  const base64urlToUint8Array = (base64String: string): Uint8Array => {
    const base64 = base64String.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4); // 패딩 추가
    const base64WithPadding = base64 + padding;
    const binaryString = atob(base64WithPadding);
    return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  };

  const handleBiometricLogin = async () => {
    try {
      // 서버로부터 WebAuthn 인증 옵션을 가져옴
      const response = await axios.get(
        `${baseUrl1}moapay/member/authn/certify/options`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          },
        }
      );

      const options = response.data;
      console.log("Received WebAuthn Options from Server: ", options);

      // challenge를 Uint8Array로 변환
      console.log("Original challenge from server:", options.challenge);
      const challengeAsUint8Array = base64urlToUint8Array(options.challenge);
      console.log("Converted to Uint8Array:", challengeAsUint8Array);
      options.challenge = challengeAsUint8Array.buffer;
      console.log("ArrayBuffer for WebAuthn API:", options.challenge);

      // allowCredentials 처리 (내장 인증 장치를 명시적으로 지정)
      options.allowCredentials = options.allowCredentials.map(
        (cred: PublicKeyCredentialDescriptor) => {
          const id =
            typeof cred.id === "string"
              ? base64urlToUint8Array(cred.id)
              : cred.id;

          return {
            ...cred,
            id, // 변환된 id 사용
            transports: ["internal"], // 지문 인식을 위해 내장 인증 장치 지정
          };
        }
      );

      // 확실하게 appid를 제거하는 코드 추가
      if (options.extensions && "appid" in options.extensions) {
        delete options.extensions.appid;
        console.log("Removed appid from extensions");
      }

      console.log("Final WebAuthn Options before Authentication: ", options);
      console.log(
        "allowCredentials after conversion:",
        options.allowCredentials
      );

      // WebAuthn API 호출
      const attestationResponse = await navigator.credentials.get({
        publicKey: options,
      });

      console.log("WebAuthn Attestation Response: ", attestationResponse);

      // 서버에 인증 결과 전송하여 검증
      const verification = await axios.post(
        `${baseUrl1}moapay/member/authn/certify/verify`,
        {
          attestationResponse,
        },
        {
          withCredentials: true,
        }
      );

      if (verification.data.verified) {
        console.log("Authentication successful");
        navigate(PATH.HOME);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  return (
    <Wrapper>
      <div className="area">
        <Header>
          <h1>생체 로그인</h1>
          <p style={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
            {!error
              ? "잘못된 인증입니다.\n다시 시도하세요"
              : "생체 인증을 진행해주세요"}
          </p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
              />
            </svg>
            <img
              width="96"
              height="96"
              src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/external-face-scan-smart-home-tanah-basah-basic-outline-tanah-basah.png"
              alt="external-face-scan-smart-home-tanah-basah-basic-outline-tanah-basah"
            />
          </div>
        </Header>
        <Button onClick={handleBiometricLogin}>인증하기</Button>
        <div
          style={{ marginTop: "20px" }}
          onClick={() => {
            navigate(PATH.PASSWORD_LOGIN, {
              state: {
                ment: `로그인을 위해.\n비밀번호를 입력해주세요`,
                back: false,
                mode: "Login",
              },
            });
          }}
        >
          간편 비밀번호로 로그인
        </div>
      </div>
    </Wrapper>
  );
};

export default BiometricsLogin;
