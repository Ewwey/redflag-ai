import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ScannerPage from './pages/ScannerPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import GuidePage from './pages/GuidePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/scan" element={<ScannerPage />} />
        <Route path="/result/:scanId" element={<ResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
