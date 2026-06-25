import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function ResultPage() {
  const [showDetailedReport, setShowDetailedReport] =
    useState(false);

  const score = 74;

  const riskLevel =
    score >= 70
      ? "DANGER"
      : score >= 40
      ? "SUSPICIOUS"
      : "SAFE";

  const riskColor =
    score >= 70
      ? "red"
      : score >= 40
      ? "yellow"
      : "green";

  const redFlags = [
    {
      phrase: "Asks to move to Telegram",
      explanation:
        "Scammers often move conversations off-platform to avoid detection and accountability.",
    },
    {
      phrase: "Requires upfront payment",
      explanation:
        "Legitimate employers never ask you to pay for training materials, background checks, or equipment.",
    },
    {
      phrase: "Promises unrealistic salary",
      explanation:
        "Offers of $5,000+/month for entry-level remote work with no experience are common red flags.",
    },
    {
      phrase: "Vague job requirements",
      explanation:
        "Legitimate job posts have clear responsibilities and qualifications.",
    },
  ];

  const detailedBreakdown = [
    {
      snippet:
        "Contact us on Telegram @quickmoney2026 to get started immediately!",
      flag: "Off-platform communication",
    },
    {
      snippet:
        "Only $99 registration fee to unlock your account and start earning",
      flag: "Upfront payment required",
    },
    {
      snippet:
        "Earn $3,000-$8,000 per month working just 2 hours a day!",
      flag: "Unrealistic compensation",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName="Juan D." />

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Risk Gauge */}
        <div className="flex flex-col items-center mb-12">
          <RiskGauge score={score} />

          <div className="mt-6 text-center">
            <div className="text-5xl font-bold mb-3">
              {score} / 100
            </div>

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

          {/* Risk Legend */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-300">
                Safe
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-sm text-gray-300">
                Suspicious
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-300">
                Danger
              </span>
            </div>
          </div>
        </div>

        {/* Risk Summary */}
        <div
          className={`mb-12 rounded-xl border p-6 ${
            riskColor === "red"
              ? "border-red-600/30 bg-red-600/10"
              : riskColor === "yellow"
              ? "border-yellow-600/30 bg-yellow-600/10"
              : "border-green-600/30 bg-green-600/10"
          }`}
        >
          <h2 className="text-xl font-bold mb-3">
            Risk Summary
          </h2>

          <p className="text-gray-300">
            {riskLevel === "DANGER" &&
              "This job post contains multiple high-risk scam indicators. Proceed with extreme caution."}

            {riskLevel === "SUSPICIOUS" &&
              "Some suspicious patterns were detected. Verify the employer before continuing."}

            {riskLevel === "SAFE" &&
              "No major scam indicators were detected."}
          </p>
        </div>

        {/* Red Flags */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Red Flags Detected
          </h2>

          <div className="space-y-4">
            {redFlags.map((flag, index) => (
              <div
                key={index}
                className="bg-white/5 border border-red-600/30 rounded-lg p-6"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-red-500">
                      {flag.phrase}
                    </h3>

                    <p className="text-gray-300">
                      {flag.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={() =>
              setShowDetailedReport(
                !showDetailedReport
              )
            }
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            {showDetailedReport
              ? "Hide"
              : "View"}{" "}
            Full Report

            {showDetailedReport ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          <Link
            to="/scan"
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-center"
          >
            Scan Another Post
          </Link>
        </div>

        {/* Detailed Breakdown */}
        {showDetailedReport && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">
              Detailed Breakdown
            </h3>

            <div className="space-y-6">
              {detailedBreakdown.map(
                (item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-red-600 pl-4"
                  >
                    <div className="text-sm text-red-500 font-semibold mb-2 uppercase">
                      {item.flag}
                    </div>

                    <div className="bg-white/5 rounded p-4 text-gray-300 italic">
                      {item.snippet.includes(
                        "Telegram"
                      ) ? (
                        <>
                          Contact us on{" "}
                          <span className="bg-red-600 text-white px-1 rounded">
                            Telegram
                          </span>{" "}
                          @quickmoney2026 to get
                          started immediately!
                        </>
                      ) : (
                        item.snippet
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RiskGauge({
  score,
}: {
  score: number;
}) {
  const radius = 120;
  const strokeWidth = 20;
  const normalizedRadius =
    radius - strokeWidth / 2;
  const circumference =
    normalizedRadius * Math.PI;

  const percentage = score / 100;

  const strokeDashoffset =
    circumference -
    percentage * circumference;

  const getColor = () => {
    if (score >= 70) return "#DC2626";
    if (score >= 40) return "#EAB308";
    return "#16A34A";
  };

  return (
    <div className="relative">
      <svg
        height={radius + 20}
        width={radius * 2 + 20}
      >
        <path
          d={`M ${strokeWidth / 2 + 10} ${
            radius + 10
          } A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2 -
            strokeWidth / 2 +
            10
          } ${radius + 10}`}
          fill="none"
          stroke="rgba(255,255,255,.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        <path
          d={`M ${strokeWidth / 2 + 10} ${
            radius + 10
          } A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${
            radius * 2 -
            strokeWidth / 2 +
            10
          } ${radius + 10}`}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition:
              "stroke-dashoffset 1s ease",
            transform: "scaleX(-1)",
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
}