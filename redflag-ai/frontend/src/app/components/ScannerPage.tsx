import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Loader2 } from "lucide-react";

export function ScannerPage() {
  const [jobPost, setJobPost] =
    useState("");
  const [isAnalyzing, setIsAnalyzing] =
    useState(false);
  const [error, setError] =
    useState("");

  const navigate = useNavigate();

  const minChars = 50;
  const maxChars = 5000;

  const charCount = jobPost.length;

  const isValid =
    charCount >= minChars &&
    charCount <= maxChars;

  const sanitizeInput = (
    text: string
  ) => {
    return text
      .replace(
        /<script.*?>.*?<\/script>/gi,
        ""
      )
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .trim();
  };

  const handleAnalyze = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (charCount < minChars) {
      setError(
        `Text too short. Please enter at least ${minChars} characters.`
      );
      return;
    }

    if (charCount > maxChars) {
      setError(
        `Text too long. Maximum allowed is ${maxChars} characters.`
      );
      return;
    }

    setError("");

    const sanitizedText =
      sanitizeInput(jobPost);

    console.log(sanitizedText);

    setIsAnalyzing(true);

    setTimeout(() => {
      navigate("/result");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName="Juan D." />

      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-xl text-gray-300">
              Analyzing job post for red
              flags...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">
          Scan a Job Post
        </h1>

        <p className="text-gray-400 mb-8">
          Paste the job description below
          and our AI will analyze it for
          scam indicators.
        </p>

        <form
          onSubmit={handleAnalyze}
          className="space-y-4"
        >
          <textarea
            value={jobPost}
            onChange={(e) =>
              setJobPost(
                e.target.value.slice(
                  0,
                  maxChars
                )
              )
            }
            placeholder="Paste the full job description here..."
            className="w-full h-80 px-4 py-3 bg-white/5 border border-white/10 rounded-lg resize-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {charCount} / {maxChars}
              characters
              {charCount < minChars &&
                ` (minimum ${minChars})`}
            </span>

            {!isValid &&
              charCount > 0 && (
                <span className="text-sm text-red-500">
                  {charCount < minChars
                    ? `Need ${
                        minChars -
                        charCount
                      } more characters`
                    : "Character limit exceeded"}
                </span>
              )}
          </div>

          {error && (
            <div className="p-3 rounded-lg border border-red-600/30 bg-red-600/10 text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={
              !isValid ||
              isAnalyzing
            }
            className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold"
          >
            Analyze Now
          </button>
        </form>
      </div>
    </div>
  );
}