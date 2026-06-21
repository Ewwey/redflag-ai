import { createBrowserRouter, Outlet } from "react-router-dom";

import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { DashboardPage } from "./components/DashboardPage";
import { ScannerPage } from "./components/ScannerPage";
import { ResultPage } from "./components/ResultPage";
import { SettingsPage } from "./components/SettingsPage";
import { RedFlagGuidePage } from "./components/RedFlagGuidePage";

import { ProtectedRoute } from "./components/ProtectedRoute";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/guide",
    element: <RedFlagGuidePage />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "scan",
        element: <ScannerPage />,
      },
      {
        path: "history",
        element: <DashboardPage />,
      },
      {
        path: "result",
        element: <ResultPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
