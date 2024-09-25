import axios from "axios";
import { AxiosResponse } from "axios";
import base64url from "base64url"; // base64url 모듈 가져오기
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types"; // 올바른 타입 확인
import { startRegistration } from "@simplewebauthn/browser";
import {
  Button,
  CheckMarkContainer,
  Header,
  Modal,
  StyledSvg,
  Wrapper,
} from "./SettingBiometricsLogin.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";

const SettingBiometricsLogin = () => {
  const { name } = useAuthStore();
  const [settingFinish, setSettingFinish] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode; // "Join" 값에 접근
  const { Login } = useAuthStore();
  const biometricsRegister = async () => {
    try {
      console.log(name);
      // 1. 서버로부터 WebAuthn 등록 옵션을 가져옴
      //    이 단계에서는 사용자 생체 인증 등록을 위한 챌린지와 공개키 정보가 포함된 옵션을 서버에서 제공.
      const options = (
        await axios.get(
          `http://localhost:18040/moapay/member/authn/register/options/예빈`
        )
      ).data;
      console.log(options);
      // 2. navigator.credentials.create() 또는 라이브러리에서 제공하는 startRegistration 사용
      //    서버에서 받은 등록 옵션을 사용해 WebAuthn 등록을 진행
      //    WebAuthn API는 사용자의 지문/얼굴 인식 장치에 등록하는 과정을 수행.
      //    서버로부터 받은 옵션을 사용하여 사용자의 인증 장치를 등록함.
      //    사용자가 지문이나 얼굴을 인식하면, attestationResponse에 결과가 저장됨.
      const attestationResponse = await startRegistration(options);
      console.log(attestationResponse);
      // 3. 등록된 생체인증 정보를 서버에 전송하여 저장함
      //    서버는 이 정보를 통해 사용자의 인증 장치를 등록하고, 나중에 인증 시 사용할 수 있도록 함.
      //    등록된 생체인증 정보는 서버에 안전하게 저장되며, 이후 로그인에 사용됨.
      const registerResult = await axios.post(
        `http://localhost:18040/moapay/member/authn/register/verify`,
        attestationResponse
      );
      if (registerResult.data.success) {
        setSettingFinish(true);
        localStorage.setItem("settingBioLogin", "true");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //test code
  // base64url 인코딩 함수
  // function base64urlEncode(buffer: Uint8Array): string {
  //   // Base64 인코딩 후, base64url 형식으로 변환 (문자열의 +, /를 -, _로 대체하고 패딩을 제거)
  //   return btoa(String.fromCharCode.apply(null, Array.from(buffer)))
  //     .replace(/\+/g, "-")
  //     .replace(/\//g, "_")
  //     .replace(/=+$/, "");
  // }

  // const biometricsRegister = async () => {
  //   try {
  //     // Uint8Array를 base64url 문자열로 변환
  //     const userId = base64urlEncode(
  //       Uint8Array.from("UZSL85T=", (c) => c.charCodeAt(0))
  //     );

  //     const options: PublicKeyCredentialCreationOptionsJSON = {
  //       challenge: base64urlEncode(
  //         Uint8Array.from("AQIDBAUGBwgJCgsMDQ4PEA", (c) => c.charCodeAt(0))
  //       ),
  //       rp: {
  //         name: "Local Development", // 로컬 개발 환경에서 사용할 수 있는 이름
  //         id: window.location.hostname,
  //       },
  //       user: {
  //         id: userId, // base64url로 인코딩된 사용자 ID
  //         name: "user@example.com",
  //         displayName: "John Doe",
  //       },
  //       pubKeyCredParams: [
  //         {
  //           type: "public-key",
  //           alg: -7, // ES256
  //         },
  //         {
  //           type: "public-key",
  //           alg: -257, // RS256
  //         },
  //       ],
  //       authenticatorSelection: {
  //         authenticatorAttachment: "platform",
  //         requireResidentKey: false,
  //         userVerification: "preferred",
  //       },
  //       timeout: 60000,
  //       attestation: "direct",
  //       excludeCredentials: [],
  //       extensions: {},
  //     };

  //     // WebAuthn 등록 진행
  //     const attestationResponse = await startRegistration(options);

  //     if (attestationResponse) {
  //       setSettingFinish(true);
  //       localStorage.setItem("settingBioLogin", "true");
  //     }
  //   } catch (e) {
  //     console.error("WebAuthn 등록 중 오류 발생:", e);
  //   }
  // };

  const skipSettingBiometrics = () => {
    localStorage.setItem("settingBioLogin", "false");
  };
  const checkingPath = async () => {
    //new Login인 경우 카드 정보를 불러오는 곳으로 이동
    if (mode == "newLogin") {
      await Login();
      navigate(PATH.BRING_CARD);
    }
    //그 외에는 home으로 이동
    else {
      navigate(PATH.HOME);
    }
  };

  return (
    <Wrapper>
      <div className="area">
        <Header>
          <h1>생체 인증</h1>
          <p>인증 정보 등록을 완료해주세요!</p>
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
        <Button
          onClick={() => {
            biometricsRegister();
          }}
        >
          등록하기
        </Button>
        {mode == "Join" || mode == "NewLogin" ? (
          <div
            onClick={() => {
              skipSettingBiometrics();
              navigate(PATH.HOME);
            }}
          >
            다음에 설정하기
          </div>
        ) : null}
      </div>
      {settingFinish ? (
        <Modal>
          <div className="box">
            <CheckMarkContainer>
              <StyledSvg viewBox="0 0 52 52">
                <path d="M14 27 L22 35 L38 16" />
              </StyledSvg>
            </CheckMarkContainer>
            <p className="ment">등록이 완료되었습니다.</p>
            <button
              onClick={() => {
                checkingPath();
              }}
            >
              확인
            </button>
          </div>
        </Modal>
      ) : null}
    </Wrapper>
  );
};
export default SettingBiometricsLogin;
