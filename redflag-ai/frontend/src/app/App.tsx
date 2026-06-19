/* this page is useless for now, but i'm keeping it just in case

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { AuthProvider } from "../context/AuthContext";

function DashboardPage() {
  return <div>Dashboard</div>;
}

function HomePage() {
  return <div>Home</div>;
}

//export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
*/
