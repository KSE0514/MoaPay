import React, { useEffect } from "react";
import { create } from "zustand";
import { useNavigate } from "react-router-dom";
import { PATH } from "../constants/path";

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));

const AppAuthHandler: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        localStorage.setItem("lastBackgroundTime", Date.now().toString());
      } else {
        const lastBackgroundTime = localStorage.getItem("lastBackgroundTime");
        if (lastBackgroundTime) {
          const timeDiff = Date.now() - parseInt(lastBackgroundTime, 10);
          if (timeDiff > 60000) {
            requestSimpleLogin();
          }
        }
      }
    };

    const handleAppStart = () => {
      const lastActiveTime = localStorage.getItem("lastActiveTime");
      const hasLoggedInBefore =
        localStorage.getItem("hasLoggedInBefore") === "true";

      if (!lastActiveTime) {
        if (hasLoggedInBefore) {
          requestSimpleLogin();
        } else {
          requestSignUp();
        }
      } else {
        setIsLoggedIn(hasLoggedInBefore);
      }

      localStorage.setItem("lastActiveTime", Date.now().toString());
    };

    const requestSimpleLogin = () => {
      navigate(PATH.BIOMETRICS_LOGIN);
    };

    const requestSignUp = () => {
      navigate(PATH.CREATE_ACCOUNT);
    };

    handleAppStart();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate, setIsLoggedIn]);

  return null;
};

export default AppAuthHandler;
