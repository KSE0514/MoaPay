import axios from "axios"; // axios 임포트
import { AxiosResponse } from "axios";
import { Button, Header, Wrapper } from "./BiometricsLogin.styles";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useState } from "react";
const BiometricsLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const handleBiometricLogin = async () => {
    try {
      // 2. 서버로부터 WebAuthn 인증 옵션(챌린지 포함)을 가져옴
      //    - '/api/auth/webauthn/options' 경로로 GET 요청을 보내서 서버로부터 인증 옵션을 받아옴.
      //    - 이 옵션에는 인증에 필요한 '챌린지'(서버가 제공하는 일회용 코드)와 공용키 정보가 포함됨.
      const options = await axios
        .get("/api/auth/webauthn/options")
        .then((res: AxiosResponse) => res.data);
      //    - res.data: 서버에서 응답한 데이터를 받아오는 부분.

      // 3. 사용자에게 생체 인증을 요청하는 부분
      //    - WebAuthn API의 navigator.credentials.get() 함수를 통해 생체인증을 요청.
      //    - 이 과정에서 사용자의 지문, 얼굴 인식 등을 통해 인증이 시도됨.
      const authenticationResponse = await navigator.credentials.get({
        publicKey: options, // 서버에서 받아온 WebAuthn 옵션을 통해 사용자 인증 요청
      });
      //    - publicKey: 서버에서 받은 WebAuthn 옵션을 사용하여 사용자에게 생체인증을 요청함.
      //    - 인증이 완료되면 authenticationResponse에 결과가 담김.

      // 4. 서버에 인증 결과를 전송하여 검증
      //    - 생체인증을 통해 생성된 'authenticationResponse'를 서버에 POST 요청으로 전송.
      //    - 이 응답은 사용자의 인증 결과를 담고 있으며, 서버는 이를 검증하여 인증이 성공했는지 확인함.
      const verification = await axios.post(
        "/api/auth/webauthn/verify",
        authenticationResponse
      );
      //    - POST 요청: 인증 결과를 서버에 전송하기 위해 사용됨.
      //    - authenticationResponse: WebAuthn을 통해 사용자 인증을 완료한 후 반환된 객체.
      // 5. 서버로부터 받은 인증 결과를 처리
      //    - 서버는 인증이 성공했는지 여부를 응답으로 보내줌.
      if (verification.data.verified) {
        // 서버로부터 verified 값이 true이면, 인증이 성공한 것
        console.log("생체 인증 성공");
        navigate(PATH.HOME);
      } else {
        setError(true);
      }
    } catch (err) {
      // 6. 오류가 발생한 경우
      //    - 인증 과정에서 오류가 발생하면 catch 블록이 실행되며, 오류 메시지를 출력.
      console.error("인증 중 오류 발생:", err);
    }
  };

  // //test 코드
  // const handleBiometricLogin = async () => {
  //   try {
  //     // 2. 임의로 WebAuthn 인증 옵션 생성
  //     const options: PublicKeyCredentialRequestOptions = {
  //       challenge: Uint8Array.from("test-challenge", (c) => c.charCodeAt(0)), // 임의의 챌린지
  //       rpId: window.location.hostname, // Relying Party ID (테스트에서는 localhost)
  //       allowCredentials: [
  //         {
  //           id: new Uint8Array(16), // 임의의 credential ID
  //           type: "public-key" as const, // 타입을 명시적으로 "public-key"로 설정
  //         },
  //       ],
  //       userVerification: "preferred", // 사용자 검증
  //       timeout: 60000, // 60초 대기
  //     };

  //     // 3. 사용자에게 생체 인증을 요청
  //     const authenticationResponse = await navigator.credentials.get({
  //       publicKey: options,
  //     });

  //     // 4. 인증 결과 서버에 전송
  //     const verification = await axios.post(
  //       "/api/auth/webauthn/verify",
  //       authenticationResponse
  //     );

  //     // 5. 서버로부터 받은 인증 결과 처리
  //     if (verification.data.verified) {
  //       console.log("생체 인증 성공");
  //       navigate(PATH.HOME);
  //     }
  //   } catch (err) {
  //     console.error("인증 중 오류 발생:", err);
  //   }
  // };

  return (
    <Wrapper>
      <div className="area">
        <Header>
          <h1>생체 로그인</h1>
          <p>
            {!error
              ? "잘못된 인증입니다. 다시 시도하세요"
              : "생체 인증을 진행해주세요"}
          </p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6">
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
        <Button
          onClick={() => {
            handleBiometricLogin();
          }}>
          인증하기
        </Button>
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
          }}>
          간편 비밀번호로 로그인
        </div>
      </div>
    </Wrapper>
  );
};
export default BiometricsLogin;
