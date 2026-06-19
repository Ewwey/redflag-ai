import { createBrowserRouter } from "react-router-dom";

import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { DashboardPage } from "./components/DashboardPage";
import { ScannerPage } from "./components/ScannerPage";
import { ResultPage } from "./components/ResultPage";
import { SettingsPage } from "./components/SettingsPage";
import { RedFlagGuidePage } from "./components/RedFlagGuidePage";

import { ProtectedRoute } from "./components/ProtectedRoute";

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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/result",
    element: (
      <ProtectedRoute>
        <ResultPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/result",
    element: (
      <ProtectedRoute>
        <ResultPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/guide",
    element: <RedFlagGuidePage />,
  },
]);
