import "./styles/font.css";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import reset from "styled-reset";
import router from "./router/routes";
import AppAuthHandler from "./pages/AppAuthHandler";
import { requestPermission } from "./FCM.ts";

const GlobalStyles = createGlobalStyle`
  ${reset};

  body,html{
    height: 100vh;
  }
 *{
  box-sizing: border-box;
  font-family: 'Pretendard-Regular';
  }
  .error {
  color: red;
  font-size: 12px;
  margin-bottom: 5px;
  }
  :root{
    --light-gray:rgb(217, 217, 217);
    --light-purple:#c473f6;
    --day-font:"Reem Kufi Ink", sans-serif;
    --padding-bottom:93.5px;
    --padding-bottom-small:71px;
  }



`;

const Wrapper = styled.div`
  font-family: "Pretendard-Regular";
`;

function App() {
  useEffect(() => {
    requestPermission(); // 컴포넌트가 마운트될 때 requestPermission 호출
  }, []); // 빈 배열을 전달하여 한 번만 호출

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
