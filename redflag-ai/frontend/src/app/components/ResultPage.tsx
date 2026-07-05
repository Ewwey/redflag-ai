import { useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AlertTriangle, ChevronDown, ChevronUp, CheckCircle, Flag, ArrowLeft, RotateCcw } from "lucide-react";
import axios from "axios";

interface RedFlagHit {
  phrase: string;
  category: string;
  explanation: string;
  highlighted_text?: string;
}

interface ScanDataPayload {
  scan_id: number;
  scam_score?: number;
  risk_level?: string;
  red_flags?: RedFlagHit[];
}

export function ResultPage() {
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<string | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scanData = location.state?.scanData as ScanDataPayload | undefined;

  if (!scanData || typeof scanData.scan_id === "undefined") {
    return <Navigate to="/scan" replace />;
  }

  const score = scanData.scam_score ?? 0;
  const riskLevel = (scanData.risk_level || "Safe").toUpperCase();
  const redFlags = scanData.red_flags || [];

  const riskColor =
    score >= 70 ? "red" : score >= 40 ? "yellow" : "green";

  const storedUser = localStorage.getItem("redflagUser");
  const userName = storedUser
    ? JSON.parse(storedUser).display_name || JSON.parse(storedUser).email || "User"
    : "User";

  const getToken = () => {
    const stored = localStorage.getItem("redflagUser");
    return stored ? JSON.parse(stored).token : null;
  };

  const handleFeedback = async (status: "Resolved" | "False_Positive" | "False_Negative") => {
    setFeedbackLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      await axios.patch(
        `${baseURL}/scans/${scanData.scan_id}/feedback`,
        null,
        {
          params: { feedback_status: status },
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setFeedbackStatus(status);
    } catch (err) {
      console.error("Feedback update failed:", err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const riskSummaryText = {
    DANGER: "This job post contains multiple high-risk scam indicators. Do not share personal information or send any money. Report this posting immediately.",
    SUSPICIOUS: "Some suspicious language or requests were detected. Verify the employer through official channels before sharing any sensitive information.",
    SAFE: "No major threat patterns were detected. This post appears legitimate, but always exercise caution when applying for jobs online.",
  }[riskLevel] || "Analysis complete.";

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName={userName} />

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Risk Gauge */}
        <div className="flex flex-col items-center mb-12">
          <RiskGauge score={score} />

          <div className="mt-6 text-center">
            <div className="text-5xl font-bold mb-3">{score} / 100</div>
            <div
              className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${
                riskColor === "red"
                  ? "bg-red-600/20 text-red-500 border-2 border-red-600"
                  : riskColor === "yellow"
                  ? "bg-yellow-600/20 text-yellow-500 border-2 border-yellow-600"
                  : "bg-green-600/20 text-green-500 border-2 border-green-600"
              }`}
            >
              {riskLevel}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6">
            {[
              { color: "bg-green-500", label: "Safe (0–39)" },
              { color: "bg-yellow-500", label: "Suspicious (40–69)" },
              { color: "bg-red-500", label: "Danger (70–100)" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-sm text-gray-300">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Summary Banner */}
        <div
          className={`mb-8 rounded-xl border p-6 ${
            riskColor === "red"
              ? "border-red-600/30 bg-red-600/10"
              : riskColor === "yellow"
              ? "border-yellow-600/30 bg-yellow-600/10"
              : "border-green-600/30 bg-green-600/10"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">Risk Summary</h2>
          <p className="text-gray-300">{riskSummaryText}</p>
        </div>

        {/* Feedback buttons */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Was this result accurate?</h2>
          {feedbackStatus ? (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>
                {feedbackStatus === "Resolved"
                  ? "Marked as resolved. Thanks for the update!"
                  : feedbackStatus === "False_Positive"
                  ? "Reported as false positive. Thanks for your feedback!"
                  : "Reported as missed scam. Thanks for your feedback!"}
              </span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleFeedback("Resolved")}
                disabled={feedbackLoading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600/20 border border-green-600/40 hover:bg-green-600/30 text-green-400 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Resolved
              </button>
              <button
                onClick={() => handleFeedback("False_Positive")}
                disabled={feedbackLoading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-yellow-600/20 border border-yellow-600/40 hover:bg-yellow-600/30 text-yellow-400 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Flag className="w-4 h-4" />
                Report: Not a Scam
              </button>
              <button
                onClick={() => handleFeedback("False_Negative")}
                disabled={feedbackLoading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600/20 border border-red-600/40 hover:bg-red-600/30 text-red-400 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <Flag className="w-4 h-4" />
                Report: Missed Scam
              </button>
            </div>
          )}
        </div>

        {/* Red Flags */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">
            {redFlags.length === 0 ? "No Red Flags Detected ✓" : `Red Flags Detected (${redFlags.length})`}
          </h2>

          {redFlags.length === 0 ? (
            <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-6 text-green-400">
              This job post passed all our NLP checks. No suspicious phrases or patterns were found.
            </div>
          ) : (
            <div className="space-y-4">
              {redFlags.map((flag, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-red-600/30 rounded-lg p-6"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                        {flag.category || "NLP Indicator"}
                      </span>
                      <h3 className="font-semibold text-lg mb-2 text-red-400">
                        "{flag.phrase}"
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{flag.explanation}</p>
                      {flag.highlighted_text && (
                        <div className="mt-3 text-xs text-gray-400">
                          Matched in text:{" "}
                          <span className="bg-red-600/20 text-red-400 px-1.5 py-0.5 rounded font-mono border border-red-600/30">
                            {flag.highlighted_text}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Toggle detailed report */}
        {redFlags.length > 0 && (
          <button
            onClick={() => setShowDetailedReport(!showDetailedReport)}
            className="w-full mb-6 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {showDetailedReport ? "Hide" : "View"} Full Detailed Report
            {showDetailedReport ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}

        {/* Detailed breakdown */}
        {showDetailedReport && redFlags.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold mb-6">Detailed Breakdown</h3>
            <div className="space-y-6">
              {redFlags.map((item, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4">
                  <div className="text-sm text-red-500 font-semibold mb-1 uppercase">
                    {item.category || "Flag Match"}
                  </div>
                  <div className="font-medium text-white mb-2">"{item.phrase}"</div>
                  <p className="text-gray-400 text-sm mb-3">{item.explanation}</p>
                  <div className="bg-white/5 rounded p-3 text-gray-300 text-sm">
                    Matched Snippet:{" "}
                    <span className="bg-red-600/20 text-red-400 px-1.5 py-0.5 rounded font-mono border border-red-600/30">
                      {item.highlighted_text || item.phrase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <Link
            to="/scan"
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-center flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Scan Another Post
          </Link>
        </div>
      </div>
    </div>
  );
}

function RiskGauge({ score }: { score: number }) {
  const radius = 120;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * Math.PI;
  const percentage = Math.max(0, Math.min(score / 100, 1));
  const strokeDashoffset = circumference - percentage * circumference;

  const getColor = () => {
    if (score >= 70) return "#DC2626";
    if (score >= 40) return "#EAB308";
    return "#16A34A";
  };

  return (
    <div className="relative">
      <svg height={radius + 20} width={radius * 2 + 20}>
        <path
          d={`M ${strokeWidth / 2 + 10} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2 + 10} ${radius + 10}`}
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2 + 10} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2 + 10} ${radius + 10}`}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
            transform: "scaleX(-1)",
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
}