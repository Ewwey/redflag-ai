import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Loader2 } from "lucide-react";
import "../../styles/scannerpage.css";
import axios from "axios";

export function ScannerPage() {
  const [jobPost, setJobPost] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const minChars = 50;
  const maxChars = 5000;
  const charCount = jobPost.length;
  const isValid = charCount >= minChars && charCount <= maxChars;

  const sanitizeInput = (text: string) => {
    return text
      .replace(/<script.*?>.*?<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .trim();
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (charCount < minChars) {
      setError(`Text too short. Please enter at least ${minChars} characters.`);
      return;
    }

    if (charCount > maxChars) {
      setError(`Text too long. Maximum allowed is ${maxChars} characters.`);
      return;
    }

    setError("");
    const sanitizedText = sanitizeInput(jobPost);
    setIsAnalyzing(true);

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      
      //const token = localStorage.getItem("token");

      const storedUser = localStorage.getItem("redflagUser");

      const token = storedUser
        ? JSON.parse(storedUser).token
        : null;
      
      const response = await axios.post(
        `${baseURL}/scans`,
        { job_description: sanitizedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/result", { state: { scanData: response.data } });
    } catch (err: any) {
      console.error("Scan analysis failed:", err);
      const serverMessage = err.response?.data?.detail || "Something went wrong during analysis. Please try again.";
      setError(typeof serverMessage === "object" ? JSON.stringify(serverMessage) : serverMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="scanner-page">
      <Navbar isLoggedIn userName="Juan D." />

      {isAnalyzing && (
        <div className="scanner-page__overlay">
          <div className="scanner-page__overlay-content">
            <Loader2 className="scanner-page__overlay-icon" />
            <p className="scanner-page__overlay-text">
              Running backend NLP analysis modules...
            </p>
          </div>
        </div>
      )}

      <div className="scanner-page__container">
        <h1 className="scanner-page__title">Scan a Job Post</h1>
        <p className="scanner-page__subtitle">
          Paste the job description below and our AI will analyze it for scam indicators.
        </p>

        <form onSubmit={handleAnalyze} className="scanner-page__form">
          <textarea
            value={jobPost}
            onChange={(e) => setJobPost(e.target.value.slice(0, maxChars))}
            placeholder="Paste the full job description here..."
            className="scanner-page__textarea"
          />

          <div className="scanner-page__meta-row">
            <span className="scanner-page__char-count">
              {charCount} / {maxChars} characters
              {charCount < minChars && ` (minimum ${minChars})`}
            </span>

            {!isValid && charCount > 0 && (
              <span className="scanner-page__char-warning">
                {charCount < minChars
                  ? `Need ${minChars - charCount} more characters`
                  : "Character limit exceeded"}
              </span>
            )}
          </div>

          {error && (
            <div className="scanner-page__error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || isAnalyzing}
            className="scanner-page__submit-btn"
          >
            Analyze Now
          </button>
        </form>
      </div>
    </div>
  );
}
