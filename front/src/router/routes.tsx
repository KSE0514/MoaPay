// router.tsx
import { createBrowserRouter } from "react-router-dom";
import { PATH } from "../constants/path";
import ProtectedRoute from "../pages/ProtectedRoute";
import AuthProvider from "../pages/AuthProvider";
import Layout from "../components/layout/Layout/Layout";
import BiometricsLogin from "../pages/BiometricsLogin/BiometricsLogin";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Home from "../pages/Home/Home";
import AppAuthHandler from "../pages/AppAuthHandler";

const router = createBrowserRouter([
  {
    element: <AppAuthHandler />, // 최상위 레이아웃으로 AppAuthHandler 설정
    children: [
      {
        path: PATH.ROOT,
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Home />,
          },
        ],
      },
      {
        path: PATH.BIOMETRICS_LOGIN,
        element: <BiometricsLogin />,
      },
      {
        path: PATH.CREATE_ACCOUNT,
        element: <CreateAccount />,
      },
    ],
  },
]);

export default router;
