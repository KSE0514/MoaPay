// Import the functions you need from the SDKs you need
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useAuthStore } from "./store/AuthStore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzoUP1IDHrb8ACMS3YIEs00Jbl9lFGB9A",
  authDomain: "moapay-9e55b.firebaseapp.com",
  projectId: "moapay-9e55b",
  storageBucket: "moapay-9e55b.appspot.com",
  messagingSenderId: "871862370248",
  appId: "1:871862370248:web:3adb855c9201ca98a2cafd",
  measurementId: "G-C2W6LWNQWN",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app); // Messaging 초기화

// 푸시 알림 권한 요청 및 토큰 발급
export async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    try {
      // VAPID 키를 사용하여 푸시 토큰 요청
      const token = await getToken(messaging, {
        vapidKey:
          "BBcjhdZbKx2EUhuNyojxymSj4qMf5zmjT4QKQcX4LkMD4BMWLCRbloVMh5g-c4dzD3DvvGWt4glH7ZPVzpf1hg8",
      });

      console.log(`푸시 토큰 발급 완료 : ${token}`);

      // AuthStore에서 사용자 정보 가져오기
      // const user = authStore.AuthState; // 사용자 정보 가져오기 (예: user.id)

      const id = "019250e9-b495-75e3-85d9-8bf4767d9fa5";
      // 서버에 토큰 전송
      const response = await axios.post(
        `http://localhost:18020/moapay/core/dutchpay/fcmTokens`,
        {
          token: token, // 푸시 토큰
          memberId: id, // 사용자 ID
        }
      );

      console.log("서버 응답: ", response.data);
    } catch (err) {
      console.error("푸시 토큰 가져오는 중에 에러 발생", err);
    }
  } else if (permission === "denied") {
    console.log("푸시 권한 차단");
  }
}
