import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Header, Wrapper } from "./SettingBiometricsLogin.styles";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { startRegistration } from "@simplewebauthn/browser";

const SettingBiometricsLogin = () => {
  const biometricsRegister = async () => {
    // 1. 서버로부터 WebAuthn 등록 옵션을 가져옴
    //    이 단계에서는 사용자 생체 인증 등록을 위한 챌린지와 공개키 정보가 포함된 옵션을 서버에서 제공.

    const options = await axios
      .get("/api/auth/webauthn/register/options")
      .then((res) => res.data);

    // 2.     //    navigator.credentials.create() 또는 라이브러리에서 제공하는 startRegistration 사용
    //    서버에서 받은 등록 옵션을 사용해 WebAuthn 등록을 진행
    //    WebAuthn API는 사용자의 지문/얼굴 인식 장치에 등록하는 과정을 수행.
    //    서버로부터 받은 옵션을 사용하여 사용자의 인증 장치를 등록함.
    //    사용자가 지문이나 얼굴을 인식하면, attestationResponse에 결과가 저장됨.
    const attestationResponse = await startRegistration(options);

    // 3. 등록된 생체인증 정보를 서버에 전송하여 저장함
    //    서버는 이 정보를 통해 사용자의 인증 장치를 등록하고, 나중에 인증 시 사용할 수 있도록 함.
    //    등록된 생체인증 정보는 서버에 안전하게 저장되며, 이후 로그인에 사용됨.
    await axios.post("/api/auth/webauthn/register", attestationResponse);
  };
  return (
    <Wrapper>
      <div className="area">
        <Header>
          <h1>지문 등록</h1>
          <p>지문 등록을 완료해주세요!</p>
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
            {/* <img
              width="96"
              height="96"
              src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/external-face-scan-smart-home-tanah-basah-basic-outline-tanah-basah.png"
              alt="external-face-scan-smart-home-tanah-basah-basic-outline-tanah-basah"
            /> */}
          </div>
        </Header>
        <Button
          onClick={() => {
            biometricsRegister();
          }}
        >
          등록하기
        </Button>
      </div>
    </Wrapper>
  );
};
export default SettingBiometricsLogin;
// navigate(PATH.PASSWORD_LOGIN, {
//   state: {
//     ment: `간편 비밀번호를\n입력해주세요`,
//     back: false,
//     mode: "Join",
//   },
// });
