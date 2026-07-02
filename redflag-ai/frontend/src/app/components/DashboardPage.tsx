import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useAuth } from "../../hooks/useAuth";
import {
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  Eye,
  ArrowUpDown,
  Filter
} from "lucide-react";

type RiskLevel = "All" | "Safe" | "Suspicious" | "Danger";
type SortOrder = "Newest" | "Oldest";

interface RedFlagHit {
  phrase: string;
  category: string;
  explanation: string;
  highlighted_text?: string;
}

interface ScanEntry {
  scan_id: number;
  date: string;
  time: string;
  job_description: string;
  risk_level: string;
  scam_score: number;
  red_flags: RedFlagHit[];
}

const mockScans: ScanEntry[] = [
  {
    scan_id: 1,
    date: "2026-06-07",
    time: "3:45 PM",
    job_description: "Urgent hiring! Work from home, earn $5000/month. No experience needed. Contact us on Telegram...",
    risk_level: "Danger",
    scam_score: 87,
    red_flags: [
      { phrase: "Contact us on Telegram", category: "Suspicious Contact Method", explanation: "Moving to messaging apps like Telegram is a common scam tactic to avoid corporate accountability." },
      { phrase: "earn $5000/month. No experience needed", category: "Unrealistic Compensation", explanation: "Promises of extremely high pay for minimal entry-level requirements are designed to lure targets." }
    ]
  },
  {
    scan_id: 2,
    date: "2026-06-06",
    time: "10:22 AM",
    job_description: "Marketing Assistant needed for established tech company. 2+ years experience required. Benefits include...",
    risk_level: "Safe",
    scam_score: 12,
    red_flags: []
  },
  {
    scan_id: 3,
    date: "2026-06-05",
    time: "2:15 PM",
    job_description: "Data entry position available. Must pay $50 registration fee for background check. High earning potential...",
    risk_level: "Danger",
    scam_score: 92,
    red_flags: [
      { phrase: "Must pay $50 registration fee", category: "Upfront Payment Required", explanation: "Legitimate employers never ask candidates to pay structural operational costs or screening fees to work." }
    ]
  },
  {
    scan_id: 4,
    date: "2026-06-04",
    time: "11:30 AM",
    job_description: "Looking for virtual assistant. Must be available flexible hours. Send resume to personal email for consideration...",
    risk_level: "Suspicious",
    scam_score: 56,
    red_flags: [
      { phrase: "Send resume to personal email", category: "Unprofessional Communication", explanation: "Established firms process communication protocols through official organizational domains rather than public services." }
    ]
  },
  {
    scan_id: 5,
    date: "2026-06-03",
    time: "4:50 PM",
    job_description: "Senior Software Engineer at Acme Corp. Strong Python and React skills required. Apply through our careers portal...",
    risk_level: "Safe",
    scam_score: 8,
    red_flags: []
  },
  {
    scan_id: 6,
    date: "2026-06-02",
    time: "9:10 AM",
    job_description: "Easy money! Just process payments and keep 10% commission. Quick start, no interview needed...",
    risk_level: "Danger",
    scam_score: 95,
    red_flags: [
      { phrase: "no interview needed", category: "Too Easy to Get Hired", explanation: "Absence of structured screening frameworks points directly to financial mule recruitment mechanics." }
    ]
  }
];

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filterLevel, setFilterLevel] = useState<RiskLevel>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("Newest");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // View Scan Detail Feature: Forwards historical context object directly into the ResultPage view layout
  const handleViewDetails = (scan: ScanEntry) => {
    navigate("/result", {
      state: {
        scanData: {
          scan_id: scan.scan_id,
          scam_score: scan.scam_score,
          risk_level: scan.risk_level,
          red_flags: scan.red_flags
        }
      }
    });
  };

  const totalScans = mockScans.length;
  const dangerResults = mockScans.filter((s) => s.risk_level === "Danger").length;
  const safeResults = mockScans.filter((s) => s.risk_level === "Safe").length;

  const filteredScans = mockScans
    .filter((scan) => filterLevel === "All" || scan.risk_level === filterLevel)
    .sort((a, b) => {
      const dateA = new Date(a.date + " " + a.time);
      const dateB = new Date(b.date + " " + b.time);
      return sortOrder === "Newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const formatScanDate = (dateStr: string) => {
    const scanDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    if (isSameDay(scanDate, today)) return "Today";
    if (isSameDay(scanDate, yesterday)) return "Yesterday";

    return scanDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName={user?.name || user?.email || "Juan D."} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Module */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Scan History</h1>
          <div className="flex gap-3">
            <Link to="/scan" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
              New Scan
            </Link>
            <button onClick={handleLogout} className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* Analytics Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-sm text-gray-400">Total Scans</div>
            </div>
            <div className="text-3xl font-bold">{totalScans}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-sm text-gray-400">Danger Results</div>
            </div>
            <div className="text-3xl font-bold text-red-500">{dangerResults}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-sm text-gray-400">Safe Results</div>
            </div>
            <div className="text-3xl font-bold text-green-500">{safeResults}</div>
          </div>
        </div>

        {/* Data Filter Matrix Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400 mr-2" />
            {(["All", "Safe", "Suspicious", "Danger"] as RiskLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filterLevel === level ? "bg-red-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="bg-[#0D1117] border border-white/10 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-red-600 text-gray-300"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* History Log Data Table */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-sm font-medium">
                  <th className="p-4">Date Added</th>
                  <th className="p-4">Job Description Preview</th>
                  <th className="p-4">Threat Assessment</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredScans.map((scan) => {
                  const badgeColors = {
                    Safe: "bg-green-600/20 text-green-500 border-green-600/30",
                    Suspicious: "bg-yellow-600/20 text-yellow-500 border-yellow-600/30",
                    Danger: "bg-red-600/20 text-red-500 border-red-600/30",
                  }[scan.risk_level] || "bg-gray-600/20 text-gray-400 border-gray-600/30";

                  return (
                    <tr key={scan.scan_id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 whitespace-nowrap text-sm text-gray-300">
                        <div>{formatScanDate(scan.date)}</div>
                        <div className="text-xs text-gray-500">{scan.time}</div>
                      </td>
                      <td className="p-4 max-w-md">
                        <p className="text-sm text-gray-300 truncate italic">
                          "{scan.job_description}"
                        </p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColors}`}>
                            {scan.risk_level.toUpperCase()}
                          </span>
                          <span className="text-sm font-semibold text-gray-400">
                            {scan.scam_score}/100
                          </span>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewDetails(scan)}
                          className="p-2 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/40 rounded text-gray-400 hover:text-red-400 transition-all"
                          title="View Scan Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredScans.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No historical entries match your current tracking criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
