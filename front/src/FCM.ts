// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
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
const messaging = getMessaging(app); // Messaging 초기화

export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      // VAPID 키를 사용하여 푸시 토큰 요청
      getToken(messaging, {
        vapidKey:
          "BBcjhdZbKx2EUhuNyojxymSj4qMf5zmjT4QKQcX4LkMD4BMWLCRbloVMh5g-c4dzD3DvvGWt4glH7ZPVzpf1hg8",
      })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`);
          // 여기서 서버에 토큰을 전송하는 로직을 추가할 수 있습니다.
        })
        .catch((err) => {
          console.error("푸시 토큰 가져오는 중에 에러 발생", err);
        });
    } else if (permission === "denied") {
      console.log("푸시 권한 차단");
    }
  });
}
