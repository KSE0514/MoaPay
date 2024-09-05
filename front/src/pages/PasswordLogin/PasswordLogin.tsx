import React from "react";
import { useLocation } from "react-router-dom";
import {
  KeyPad,
  Ment,
  PasswordView,
  Wrapper,
  Nav,
} from "./PasswordLogin.styles";

const PasswordLogin: React.FC = () => {
  const location = useLocation();

  // 구조 분해 할당하면서 타입 정의를 분리
  const { ment, doubleCheck, back, beforePasswordCheck } =
    (location.state as {
      ment: string;
      doubleCheck: boolean;
      beforePasswordCheck: boolean;
      back: boolean;
    }) || {};

  return (
    <Wrapper>
      <Nav>
        {back && (
          <button onClick={() => window.history.back()}>뒤로가기</button>
        )}
      </Nav>
      <Ment>
        {ment.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Ment>
      <PasswordView></PasswordView>
      <KeyPad></KeyPad>
    </Wrapper>
  );
};

export default PasswordLogin;
