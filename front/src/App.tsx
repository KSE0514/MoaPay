import "./styles/font.css";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import reset from "styled-reset";
import router from "./router/routes";
import AppAuthHandler from "./pages/AppAuthHandler";

const GlobalStyles = createGlobalStyle`
  ${reset};

 *{
  box-sizing: border-box;
  font-family: 'Pretendard-Regular';
  
  }
  .error {
  color: red;
  font-size: 12px;
  margin-bottom: 5px;
}



`;
const Wrapper = styled.div`
  font-family: "Pretendard-Regular";
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
