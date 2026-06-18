import { createBrowserRouter } from "react-router";
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
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/scan",
    Component: ScannerPage,
  },
  {
    path: "/result",
    Component: ResultPage,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
  },
  {
    path: "/guide",
    Component: RedFlagGuidePage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
]);
