import "./styles/font.css";
import "../node_modules/magic.css/dist/magic.css";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import { RouterProvider } from "react-router-dom";
import reset from "styled-reset";
import router from "./router/routes";
import AppAuthHandler from "./pages/AppAuthHandler";
import { requestPermission, messaging } from "./FCM.ts";
import { onMessage } from "firebase/messaging";
import { useAuthStore } from "./store/AuthStore";

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
  const { id, accessToken } = useAuthStore((state) => ({
    id: "019250e9-b495-75e3-85d9-8bf4767d9fa5",
    accessToken: state.accessToken as string | null,
  }));

  useEffect(() => {
    requestPermission(id, accessToken); // 컴포넌트가 마운트될 때 requestPermission 호출

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);

      // 알림 표시 함수 (내용을 고정)
      const showNotification = () => {
        const notification = new Notification(
          payload.notification?.title ?? "Title", // 알림 제목 고정
          {
            body: payload.notification?.body ?? "Body", // 알림 본문 고정
            icon: payload.notification?.icon ?? "/default-icon.png", // 알림 아이콘 고정
          }
        );
      };

      // 첫 번째 알림을 2초 뒤에 표시
      setTimeout(() => {
        showNotification();
      }, 2000); // 2초 후에 첫 알림 표시
    });

    return () => {
      unsubscribe();
    };
  }, [id, accessToken]);

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
