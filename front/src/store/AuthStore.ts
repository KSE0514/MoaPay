import { create } from "zustand";

interface AuthState {
  id: string | null; // 최소한의 사용자 식별 정보
  name: string | null; // 사용자 이름
  isLoggedIn: boolean; // 로그인 여부
  setIsLoggedIn: (value: boolean) => void;
  setUserInfo: (id: string, name: string) => void;
  Login: () => void; // 로그인 상태를 설정하는 함수
}

export const useAuthStore = create<AuthState>((set) => ({
  id: null,
  name: null,
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUserInfo: (id, name) => set({ id, name }),
  Login: () => {
    localStorage.setItem("hasLoggedInBefore", "true");
    set({ isLoggedIn: true }); // 여기서 직접 상태 업데이트
  },
  Logout: () => {
    localStorage.removeItem("hasLoggedInBefore");
    set({ isLoggedIn: false }); // 여기서 직접 상태 업데이트
  },
}));
