import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

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
  const location = useLocation();

  // Extract the live response payload forwarded from the ScannerPage network call
  const scanData = location.state?.scanData as ScanDataPayload | undefined;

  // Route Security Guard: Redirect back to scanner if accessed without a valid scan payload
  if (!scanData || typeof scanData.scan_id === "undefined") {
    return <Navigate to="/scan" replace />;
  }

  // Map real backend payload properties using robust development fallbacks
  const score = scanData.scam_score ?? 0;
  const riskLevel = (scanData.risk_level || "SAFE").toUpperCase();
  const redFlags = scanData.red_flags || [];

  const riskColor =
    score >= 70
      ? "red"
      : score >= 40
      ? "yellow"
      : "green";

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName="Juan D." />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Dynamic Risk Gauge */}
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

          {/* Scale Legend */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-gray-300">Suspicious</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-300">Danger</span>
            </div>
          </div>
        </div>

        {/* Dynamic Risk Summary Banner */}
        <div
          className={`mb-12 rounded-xl border p-6 ${
            riskColor === "red"
              ? "border-red-600/30 bg-red-600/10"
              : riskColor === "yellow"
              ? "border-yellow-600/30 bg-yellow-600/10"
              : "border-green-600/30 bg-green-600/10"
          }`}
        >
          <h2 className="text-xl font-bold mb-3">Risk Summary</h2>
          <p className="text-gray-300">
            {riskLevel === "DANGER" || riskLevel === "RED"
              ? "This job post contains multiple high-risk scam indicators verified by our NLP layers. Proceed with extreme caution."
              : riskLevel === "SUSPICIOUS" || riskLevel === "YELLOW"
              ? "Some suspicious language or requests were detected. Verify the employer before sharing sensitive information."
              : "No major threat patterns or systemic red flags were detected within this job text."}
          </p>
        </div>

        {/* Red Flags Loop Display Module */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            {redFlags.length === 0 ? "No Red Flags Detected" : "Red Flags Detected"}
          </h2>

          <div className="space-y-4">
            {redFlags.map((flag, index) => (
              <div
                key={index}
                className="bg-white/5 border border-red-600/30 rounded-lg p-6"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-1">
                      {flag.category || "NLP Indicator Pattern"}
                    </span>
                    <h3 className="font-semibold text-lg mb-2 text-red-500">
                      {flag.phrase}
                    </h3>
                    <p className="text-gray-300">{flag.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Form Grid Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() => setShowDetailedReport(!showDetailedReport)}
            disabled={redFlags.length === 0}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            {showDetailedReport ? "Hide" : "View"} Full Report
            {showDetailedReport ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          <Link
            to="/scan"
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-center"
          >
            Scan Another Post
          </Link>
        </div>

        {/* Collapsible NLP Text Highlighting Submodule */}
        {showDetailedReport && redFlags.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">Detailed Breakdown</h3>
            <div className="space-y-6">
              {redFlags.map((item, index) => (
                <div key={index} className="border-l-4 border-red-600 pl-4">
                  <div className="text-sm text-red-500 font-semibold mb-2 uppercase">
                    {item.category || "Flag Match"}
                  </div>
                  <div className="bg-white/5 rounded p-4 text-gray-300 italic">
                    Matched Snippet:{" "}
                    <span className="bg-red-600/20 text-red-400 px-1.5 py-0.5 rounded font-mono not-italic text-sm ml-1 border border-red-600/30">
                      {item.highlighted_text || item.phrase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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
          d={`M ${strokeWidth / 2 + 10} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2 - strokeWidth / 2 + 10
          } ${radius + 10}`}
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2 + 10} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2 - strokeWidth / 2 + 10
          } ${radius + 10}`}
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
