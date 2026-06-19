import { createBrowserRouter } from "react-router-dom";

import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ScannerPage } from "./components/ScannerPage";
import { ResultPage } from "./components/ResultPage";
import { DashboardPage } from "./components/DashboardPage";
import { RedFlagGuidePage } from "./components/RedFlagGuidePage";
import { SettingsPage } from "./components/SettingsPage";

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
    path: "/scan",
    element: <ScannerPage />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/guide",
    element: <RedFlagGuidePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);