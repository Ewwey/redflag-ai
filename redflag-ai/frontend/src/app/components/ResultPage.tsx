import { useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { AlertTriangle, ChevronDown, ChevronUp, CheckCircle, Flag, ArrowLeft, RotateCcw } from "lucide-react";
import axios from "axios";
import "../../styles/resultspage.css";

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
    <div className="result-page">
      <Navbar isLoggedIn userName={userName} />

      <div className="result-page__container">

        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="result-page__back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Risk Gauge */}
        <div className="result-page__gauge-section">
          <RiskGauge score={score} />

          <div className="result-page__gauge-score">
            <div className="result-page__score-value">{score} / 100</div>
            <div
              className={`result-page__risk-badge ${
                riskColor === "red"
                  ? "result-page__risk-badge--red"
                  : riskColor === "yellow"
                  ? "result-page__risk-badge--yellow"
                  : "result-page__risk-badge--green"
              }`}
            >
              {riskLevel}
            </div>
          </div>

          {/* Legend */}
          <div className="result-page__legend">
            {[
              { color: "bg-green-500", label: "Safe (0–39)" },
              { color: "bg-yellow-500", label: "Suspicious (40–69)" },
              { color: "bg-red-500", label: "Danger (70–100)" },
            ].map(({ color, label }) => (
              <div key={label} className="result-page__legend-item">
                <div className={`result-page__legend-dot result-page__legend-dot--${color}`} />
                <span className="result-page__legend-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Summary Banner */}
        <div
          className={`result-page__summary ${
            riskColor === "red"
              ? "result-page__summary--red"
              : riskColor === "yellow"
              ? "result-page__summary--yellow"
              : "result-page__summary--green"
          }`}
        >
          <h2 className="result-page__summary-title">Risk Summary</h2>
          <p className="result-page__summary-text">{riskSummaryText}</p>
        </div>

        {/* Feedback buttons */}
        <div className="result-page__feedback">
          <h2 className="result-page__feedback-title">Was this result accurate?</h2>
          {feedbackStatus ? (
            <div className="result-page__feedback-confirmed">
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
            <div className="result-page__feedback-buttons">
              <button
                onClick={() => handleFeedback("Resolved")}
                disabled={feedbackLoading}
                className="result-page__feedback-btn result-page__feedback-btn--resolved"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Resolved
              </button>
              <button
                onClick={() => handleFeedback("False_Positive")}
                disabled={feedbackLoading}
                className="result-page__feedback-btn result-page__feedback-btn--false-positive"
              >
                <Flag className="w-4 h-4" />
                Report: Not a Scam
              </button>
              <button
                onClick={() => handleFeedback("False_Negative")}
                disabled={feedbackLoading}
                className="result-page__feedback-btn result-page__feedback-btn--false-negative"
              >
                <Flag className="w-4 h-4" />
                Report: Missed Scam
              </button>
            </div>
          )}
        </div>

        {/* Red Flags */}
        <div className="result-page__flags-section">
          <h2 className="result-page__flags-heading">
            {redFlags.length === 0 ? "No Red Flags Detected ✓" : `Red Flags Detected (${redFlags.length})`}
          </h2>

          {redFlags.length === 0 ? (
            <div className="result-page__flags-empty">
              This job post passed all our NLP checks. No suspicious phrases or patterns were found.
            </div>
          ) : (
            <div className="result-page__flags-list">
              {redFlags.map((flag, index) => (
                <div
                  key={index}
                  className="result-page__flag-card"
                >
                  <div className="flex gap-4">
                    <div className="result-page__flag-icon">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <span className="result-page__flag-category">
                        {flag.category || "NLP Indicator"}
                      </span>
                      <h3 className="result-page__flag-phrase">
                        "{flag.phrase}"
                      </h3>
                      <p className="result-page__flag-explanation">{flag.explanation}</p>
                      {flag.highlighted_text && (
                        <div className="result-page__flag-match">
                          Matched in text:{" "}
                          <span className="result-page__flag-snippet">
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
            className="result-page__toggle-btn"
          >
            {showDetailedReport ? "Hide" : "View"} Full Detailed Report
            {showDetailedReport ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}

        {/* Detailed breakdown */}
        {showDetailedReport && redFlags.length > 0 && (
          <div className="result-page__breakdown">
            <h3 className="result-page__breakdown-title">Detailed Breakdown</h3>
            <div className="space-y-6">
              {redFlags.map((item, index) => (
                <div key={index} className="result-page__breakdown-item">
                  <div className="result-page__breakdown-category">
                    {item.category || "Flag Match"}
                  </div>
                  <div className="result-page__breakdown-phrase">"{item.phrase}"</div>
                  <p className="result-page__breakdown-explanation">{item.explanation}</p>
                  <div className="result-page__breakdown-snippet-box">
                    Matched Snippet:{" "}
                    <span className="result-page__breakdown-snippet-box">
                      {item.highlighted_text || item.phrase}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="result-page__actions">
          <button
            onClick={() => navigate("/dashboard")}
            className="result-page__action-btn result-page__action-btn--back"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <Link
            to="/scan"
            className="result-page__action-btn result-page__action-btn--primary"
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