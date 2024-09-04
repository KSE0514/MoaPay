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
  } 
  :root{
  }
body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

`;
const Wrapper = styled.div``;

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <AppAuthHandler />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
