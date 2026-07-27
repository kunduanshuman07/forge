import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/Landing/LandingPage";
import LoginPage from "@/pages/Auth/LoginPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SignupPage from "@/pages/Auth/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);