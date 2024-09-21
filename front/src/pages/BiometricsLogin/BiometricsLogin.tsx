import axios from "axios"; // axios 임포트
import { AxiosResponse } from "axios";
const BiometricsLogin = () => {
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
      }
    } catch (err) {
      // 6. 오류가 발생한 경우
      //    - 인증 과정에서 오류가 발생하면 catch 블록이 실행되며, 오류 메시지를 출력.
      console.error("인증 중 오류 발생:", err);
    }
  };
  return <></>;
};
export default BiometricsLogin;
