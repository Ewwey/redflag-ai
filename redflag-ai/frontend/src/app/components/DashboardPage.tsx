import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import {
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  Eye,
  ArrowUpDown,
  Filter,
  Trash2,
  Loader2
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
  id: number;
  scan_id?: number;
  scanned_at?: string;
  date?: string;
  time?: string;
  job_description: string;
  text_preview?: string;
  risk_level: string;
  scam_score: number;
  red_flags?: RedFlagHit[];
}

const mockScans: ScanEntry[] = [
  {
    id: 1,
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
    id: 2,
    date: "2026-06-06",
    time: "10:22 AM",
    job_description: "Marketing Assistant needed for established tech company. 2+ years experience required. Benefits include...",
    risk_level: "Safe",
    scam_score: 12,
    red_flags: []
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
    date: "2026-06-03",
    time: "4:50 PM",
    job_description: "Senior Software Engineer at Acme Corp. Strong Python and React skills required. Apply through our careers portal...",
    risk_level: "Safe",
    scam_score: 8,
    red_flags: []
  },
  {
    id: 6,
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
  const { user, logout } = useAuth() as { user: any; logout: () => void };

  const [filterLevel, setFilterLevel] = useState<RiskLevel>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("Newest");
  const [scans, setScans] = useState<ScanEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [usingMock, setUsingMock] = useState(false);
  const [scanToDelete, setScanToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const storedUser = localStorage.getItem("redflagUser");
        const token = storedUser ? JSON.parse(storedUser).token : null;

        const params: Record<string, string> = {
          sort: sortOrder === "Newest" ? "newest" : "oldest",
        };
        if (filterLevel !== "All") {
          params.risk_level = filterLevel;
        }

        const response = await axios.get(`${baseURL}/scans/`, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        if (response.data && response.data.length > 0) {
          setScans(response.data);
          setUsingMock(false);
        } else {
          setScans(mockScans);
          setUsingMock(true);
        }
      } catch (err) {
        console.error("Failed to fetch scans:", err);
        setScans(mockScans);
        setUsingMock(true);
        setFetchError("Could not connect to server. Showing sample data.");
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, [filterLevel, sortOrder]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getScanId = (scan: ScanEntry) => scan.scan_id ?? scan.id;

  const handleDelete = async () => {
    if (scanToDelete === null) return;
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    try {
      if (!usingMock) {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const storedUser = localStorage.getItem("redflagUser");
        const token = storedUser ? JSON.parse(storedUser).token : null;
        await axios.delete(`${baseURL}/scans/${scanToDelete}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err: any) {
      if (err?.response?.status !== 404) {
        console.error("Delete failed:", err);
        setIsDeleting(false);
        setScanToDelete(null);
        return;
      }
    } finally {
      setScans((prev) => prev.filter((s) => getScanId(s) !== scanToDelete));
      setIsDeleting(false);
      setScanToDelete(null);
    }
  };

  const handleViewDetails = async (scan: ScanEntry) => {
    // If using mock data, just use what we have locally
    if (usingMock) {
      navigate("/result", {
        state: {
          scanData: {
            scan_id: getScanId(scan),
            scam_score: scan.scam_score,
            risk_level: scan.risk_level,
            red_flags: scan.red_flags ?? [],
          },
        },
      });
      return;
    }

    // Real data — fetch full detail from API to get red flags
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const storedUser = localStorage.getItem("redflagUser");
      const token = storedUser ? JSON.parse(storedUser).token : null;

      const response = await axios.get(`${baseURL}/scans/${getScanId(scan)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/result", {
        state: {
          scanData: {
            scan_id: response.data.scan_id ?? response.data.id,
            scam_score: response.data.scam_score,
            risk_level: response.data.risk_level,
            red_flags: response.data.red_flags ?? [],
          },
        },
      });
    } catch (err) {
      console.error("Failed to fetch scan detail:", err);
      navigate("/result", {
        state: {
          scanData: {
            scan_id: getScanId(scan),
            scam_score: scan.scam_score,
            risk_level: scan.risk_level,
            red_flags: scan.red_flags ?? [],
          },
        },
      });
    }
  };

  const formatScanDate = (scan: ScanEntry) => {
    const raw = scan.scanned_at ?? (scan.date ? scan.date + " " + (scan.time ?? "") : null);
    if (!raw) return "Unknown";
    const scanDate = new Date(raw);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
    if (isSameDay(scanDate, today)) return "Today";
    if (isSameDay(scanDate, yesterday)) return "Yesterday";
    return scanDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const formatScanTime = (scan: ScanEntry) => {
    if (scan.scanned_at) {
      return new Date(scan.scanned_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    }
    return scan.time ?? "";
  };

  const displayedScans = usingMock
    ? scans
        .filter((s) => filterLevel === "All" || s.risk_level === filterLevel)
        .sort((a, b) => {
          const rawA = a.date ? a.date + " " + (a.time ?? "") : "";
          const rawB = b.date ? b.date + " " + (b.time ?? "") : "";
          const dateA = new Date(rawA).getTime();
          const dateB = new Date(rawB).getTime();
          return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
        })
    : scans;

  const totalScans = scans.length;
  const dangerResults = scans.filter((s) => s.risk_level === "Danger").length;
  const safeResults = scans.filter((s) => s.risk_level === "Safe").length;

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
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

        {/* Mock data notice */}
        {usingMock && (
          <div className="mb-6 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded-lg text-yellow-500 text-sm">
            {fetchError || "No scan history found. Showing sample data — run a real scan to populate your history!"}
          </div>
        )}

        {/* Stats */}
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

        {/* Filter + Sort */}
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

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading scan history...</span>
            </div>
          )}

          {!loading && displayedScans.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No scans match your current filter.
            </div>
          )}

          {!loading && displayedScans.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-sm font-medium">
                    <th className="p-4">Date Added</th>
                    <th className="p-4">Job Description Preview</th>
                    <th className="p-4">Threat Assessment</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {displayedScans.map((scan) => {
                    const badgeColors = {
                      Safe: "bg-green-600/20 text-green-500 border-green-600/30",
                      Suspicious: "bg-yellow-600/20 text-yellow-500 border-yellow-600/30",
                      Danger: "bg-red-600/20 text-red-500 border-red-600/30",
                    }[scan.risk_level] || "bg-gray-600/20 text-gray-400 border-gray-600/30";

                    return (
                      <tr key={getScanId(scan)} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 whitespace-nowrap text-sm text-gray-300">
                          <div>{formatScanDate(scan)}</div>
                          <div className="text-xs text-gray-500">{formatScanTime(scan)}</div>
                        </td>
                        <td className="p-4 max-w-md">
                          <p className="text-sm text-gray-300 truncate italic">
                            "{scan.text_preview || scan.job_description}"
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
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewDetails(scan)}
                              className="p-2 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/40 rounded text-gray-400 hover:text-red-400 transition-all"
                              title="View Scan Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setScanToDelete(getScanId(scan))}
                              className="p-2 bg-white/5 hover:bg-red-600/20 border border-white/10 hover:border-red-600/40 rounded text-gray-400 hover:text-red-400 transition-all"
                              title="Delete Scan"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {scanToDelete !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#161B22] border border-white/10 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-2">Remove Scan?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to remove this scan? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setScanToDelete(null)}
                disabled={isDeleting}
                className="px-5 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg font-semibold transition-colors"
              >
                {isDeleting ? "Removing..." : "Remove Scan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}