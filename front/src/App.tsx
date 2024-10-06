import "./styles/font.css";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import reset from "styled-reset";
import router from "./router/routes";
import AppAuthHandler from "./pages/AppAuthHandler";
import { requestPermission, messaging } from "./FCM.ts";
import { onMessage } from "firebase/messaging";

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
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch(function (error) {
          console.error("Service Worker registration failed:", error);
        });
    }

    requestPermission(); // 컴포넌트가 마운트될 때 requestPermission 호출

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received : ", payload);

      // 알림 표시
      new Notification(payload.notification?.title ?? "Title", {
        body: payload.notification?.body ?? "Body",
        icon: payload.notification?.icon ?? "/default-icon.png",
      });
    });

    return () => {
      unsubscribe();
    };
  }, []); // 빈 배열을 전달하여 한 번만 호출

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
