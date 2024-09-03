import { createBrowserRouter } from "react-router-dom";
import { PATH } from "../constants/path";
import ProtectedRoute from "../pages/ProtectedRoute";
import AuthProvider from "../pages/AuthProvider";
import Layout from "../components/layout/Layout/Layout";
import BiometricsLogin from "../pages/BiometricsLogin/BiometricsLogin";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
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
    element: (
        <BiometricsLogin />
    ),
  },
  {
    path: PATH.CREATE_ACCOUNT,
    element: (
      <AuthProvider>
        <CreateAccount />
      </AuthProvider>
    ),
  },
]);

export default router;