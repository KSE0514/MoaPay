import { create } from "zustand";

interface AuthState {
  id: string | null; // 최소한의 사용자 식별 정보
  name: string | null; // 사용자 이름
  isLoggedIn: boolean; // 로그인 여부
  setIsLoggedIn: (value: boolean) => void;
  setUserInfo: (id: string, name: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  id: null,
  name: null,
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setUserInfo: (id, name) => set({ id, name }),
}));
