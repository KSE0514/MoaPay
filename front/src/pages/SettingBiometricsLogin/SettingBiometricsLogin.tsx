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
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const baseUrl1 = `http://localhost:18040/`;
  const { name, accessToken, mode } = useAuthStore();
  const { Login, setBioLogin } = useAuthStore();
  const [settingFinish, setSettingFinish] = useState<boolean>(false);
  const navigate = useNavigate();
  type NestedObject = {
    [key: string]:
      | string
      | number
      | boolean
      | null
      | undefined
      | NestedObject
      | NestedObject[];
  };

  const removeNullValues = async (obj: NestedObject): Promise<void> => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key]; // null 또는 undefined인 속성 제거
      } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        // 중첩된 객체가 있는 경우 재귀적으로 처리
        removeNullValues(obj[key] as NestedObject);
      }
    });
  };

  const biometricsRegister = async () => {
    try {
      // 1. 서버로부터 WebAuthn 등록 옵션을 가져옴
      const response = await axios.get(
        `${baseUrl1}moapay/member/authn/register/options`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
          },
        }
      );
      const options = response.data;
      // rp.id를 window.location.hostname으로 변경
      await removeNullValues(options);
      // 2. WebAuthn 등록을 진행
      const attestationResponse = await startRegistration(options);
      // 지연을 추가하여 세션 쿠키가 설정될 시간을 확보
      setTimeout(async () => {
        // 3. 등록된 생체인증 정보를 서버에 전송하여 저장
        const registerResult = await axios.post(
          `${baseUrl1}moapay/member/authn/register/verify`,
          {
            id: attestationResponse.id,
            rawId: attestationResponse.rawId,
            response: {
              attestationObject: attestationResponse.response.attestationObject,
              clientDataJSON: attestationResponse.response.clientDataJSON,
            },
            type: attestationResponse.type,
            clientExtensionResults: attestationResponse.clientExtensionResults,
            authenticatorAttachment:
              attestationResponse.authenticatorAttachment,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 Bearer 토큰 추가
            },
          }
        );
        console.log(registerResult);
        if (registerResult.status == 200) {
          setBioLogin(true);
          setSettingFinish(true);
        }
      }, 1000); // 1초 지연 (필요에 따라 지연 시간을 조정 가능)
    } catch (e) {
      console.log(e);
    }
  };

  const skipSettingBiometrics = () => {};
  const checkingPath = async () => {
    console.log(mode);
    //new Login인 경우 카드 정보를 불러오는 곳으로 이동
    if (mode == "NewLogin") {
      navigate(PATH.BRING_CARD);
    } else if (mode == "Join") {
      navigate(PATH.SELECT_TYPE);
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
              checkingPath();
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
