import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useAuth } from "../../hooks/useAuth";

import {
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Eye,
} from "lucide-react";

type RiskLevel = "All" | "Safe" | "Suspicious" | "Danger";
type SortOrder = "Newest" | "Oldest";

interface ScanEntry {
  id: string;
  date: string;
  time: string;
  preview: string;
  riskLevel: Exclude<RiskLevel, "All">;
  score: number;
}

const mockScans: ScanEntry[] = [
  {
    id: "1",
    date: "2026-06-07",
    time: "3:45 PM",
    preview:
      "Urgent hiring! Work from home, earn $5000/month. No experience needed. Contact us on Telegram...",
    riskLevel: "Danger",
    score: 87,
  },
  {
    id: "2",
    date: "2026-06-06",
    time: "10:22 AM",
    preview:
      "Marketing Assistant needed for established tech company. 2+ years experience required. Benefits include...",
    riskLevel: "Safe",
    score: 12,
  },
  {
    id: "3",
    date: "2026-06-05",
    time: "2:15 PM",
    preview:
      "Data entry position available. Must pay $50 registration fee for background check. High earning potential...",
    riskLevel: "Danger",
    score: 92,
  },
  {
    id: "4",
    date: "2026-06-04",
    time: "11:30 AM",
    preview:
      "Looking for virtual assistant. Must be available flexible hours. Send resume to personal email for consideration...",
    riskLevel: "Suspicious",
    score: 56,
  },
  {
    id: "5",
    date: "2026-06-03",
    time: "4:50 PM",
    preview:
      "Senior Software Engineer at Acme Corp. Strong Python and React skills required. Apply through our careers portal...",
    riskLevel: "Safe",
    score: 8,
  },
  {
    id: "6",
    date: "2026-06-02",
    time: "9:10 AM",
    preview:
      "Easy money! Just process payments and keep 10% commission. Quick start, no interview needed...",
    riskLevel: "Danger",
    score: 95,
  },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [filterLevel, setFilterLevel] =
    useState<RiskLevel>("All");

  const [sortOrder, setSortOrder] =
    useState<SortOrder>("Newest");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalScans = mockScans.length;

  const dangerResults = mockScans.filter(
    (s) => s.riskLevel === "Danger"
  ).length;

  const safeResults = mockScans.filter(
    (s) => s.riskLevel === "Safe"
  ).length;

  const filteredScans = mockScans
    .filter(
      (scan) =>
        filterLevel === "All" ||
        scan.riskLevel === filterLevel
    )
    .sort((a, b) => {
      const dateA = new Date(a.date + " " + a.time);
      const dateB = new Date(b.date + " " + b.time);

      return sortOrder === "Newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  const getRiskBadge = (
    level: Exclude<RiskLevel, "All">,
    score: number
  ) => {
    const colors = {
      Safe: "bg-green-600/20 text-green-500 border-green-600",
      Suspicious:
        "bg-yellow-600/20 text-yellow-500 border-yellow-600",
      Danger: "bg-red-600/20 text-red-500 border-red-600",
    };

    return (
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[level]}`}
        >
          {level.toUpperCase()}
        </span>

        <span className="text-sm text-gray-400">
          {score}/100
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar
        isLoggedIn
        userName={user?.name || user?.email || "User"}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            My Scan History
          </h1>

          <div className="flex gap-3">
            <Link
              to="/scan"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              New Scan
            </Link>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-sm text-gray-400">
                Total Scans
              </div>
            </div>

            <div className="text-3xl font-bold">
              {totalScans}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-500" />
              </div>

              <div className="text-sm text-gray-400">
                Danger Results
              </div>
            </div>

            <div className="text-3xl font-bold text-red-500">
              {dangerResults}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>

              <div className="text-sm text-gray-400">
                Safe Results
              </div>
            </div>

            <div className="text-3xl font-bold text-green-500">
              {safeResults}
            </div>
          </div>
        </div>

        {/* Remaining filter and table code stays exactly the same */}
      </div>
    </div>
  );
}