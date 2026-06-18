import { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "./Navbar";
import { Loader2 } from "lucide-react";

export function ScannerPage() {
  const [jobPost, setJobPost] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const charCount = jobPost.length;
  const minChars = 50;
  const maxChars = 5000;
  const isValid = charCount >= minChars && charCount <= maxChars;

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      navigate("/result");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName="Juan D." />

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-xl text-gray-300">Analyzing job post for red flags...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Scan a Job Post</h1>
        <p className="text-gray-400 mb-8">
          Paste the job description below and our AI will analyze it for scam indicators.
        </p>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <textarea
              value={jobPost}
              onChange={(e) => setJobPost(e.target.value.slice(0, maxChars))}
              placeholder="Paste the full job description here..."
              className="w-full h-80 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all resize-none placeholder:text-gray-500 text-white"
            />
            <div className="flex items-center justify-between mt-2">
              <span
                className={`text-sm ${
                  charCount < minChars
                    ? "text-gray-500"
                    : charCount > maxChars
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {charCount} / {maxChars} characters
                {charCount < minChars && ` (minimum ${minChars})`}
              </span>
              {!isValid && charCount > 0 && (
                <span className="text-sm text-red-500">
                  {charCount < minChars
                    ? `Need ${minChars - charCount} more characters`
                    : "Character limit exceeded"}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || isAnalyzing}
            className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors text-lg"
          >
            Analyze Now
          </button>
        </form>
      </div>
    </div>
  );
}
