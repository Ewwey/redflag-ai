import { useState, useEffect, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Search, MessageSquare, DollarSign, Clock, Mail, AlertTriangle, CheckCircle, Eye, Shield, UserCheck, FileText, Loader2 } from "lucide-react";
import axios from "axios";
import "../../styles/guidepage.css";

type Tab = "red-flags" | "tips";

interface RedFlag {
  id: number;
  phrase: string;
  category: string;
  explanation: string;
  what_to_do: string;
}

interface SafetyTip {
  id: number;
  title: string;
  description: string;
}

const categoryIcons: Record<string, ReactNode> = {
  "Financial": <DollarSign className="w-5 h-5" />,
  "Contact Method": <MessageSquare className="w-5 h-5" />,
  "Unrealistic Offer": <DollarSign className="w-5 h-5" />,
  "Too Easy to Get Hired": <Clock className="w-5 h-5" />,
  "Unprofessional Communication": <Mail className="w-5 h-5" />,
  "Lack of Clear Details": <AlertTriangle className="w-5 h-5" />,
  "Urgency": <AlertTriangle className="w-5 h-5" />,
  "Personal Information": <Shield className="w-5 h-5" />,
};

const getIcon = (category: string): ReactNode => {
  return categoryIcons[category] ?? <AlertTriangle className="w-5 h-5" />;
};

export function RedFlagGuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>("red-flags");
  const [searchQuery, setSearchQuery] = useState("");
  const [redFlags, setRedFlags] = useState<RedFlag[]>([]);
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuideData = async () => {
      setLoading(true);
      setError("");
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const [flagsRes, tipsRes] = await Promise.all([
          axios.get(`${baseURL}/guide/red-flags`),
          axios.get(`${baseURL}/guide/tips`),
        ]);
        setRedFlags(flagsRes.data);
        setTips(tipsRes.data);
      } catch (err) {
        console.error("Failed to fetch guide data:", err);
        setError("Failed to load guide content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();
  }, []);

  const filteredRedFlags = redFlags.filter(
    (flag) =>
      flag.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTips = tips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="redflag-guide-page">
      <Navbar />

      <div className="redflag-guide-container">
        <div className="redflag-guide-hero">
          <h1 className="redflag-guide-title">Red Flag Guide</h1>
          <p className="redflag-guide-description">
            Learn to identify job scams and protect yourself while searching for opportunities online.
          </p>
        </div>

        {/* Search */}
        <div className="redflag-guide-search">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === "red-flags" ? "Search red flags..." : "Search safety tips..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="redflag-guide-search-input"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="redflag-guide-tabs">
          <button
            onClick={() => setActiveTab("red-flags")}
            className={`redflag-guide-tab ${activeTab === "red-flags" ? "active-red-flags" : ""}`}
          >
            Common Red Flags {!loading && `(${redFlags.length})`}
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`redflag-guide-tab ${activeTab === "tips" ? "active-tips" : ""}`}
          >
            Safe Job-Hunting Tips {!loading && `(${tips.length})`}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="redflag-guide-loading">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading guide content...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="redflag-guide-error">{error}</div>
        )}

        {/* Red Flags */}
        {!loading && !error && activeTab === "red-flags" && (
          <>
            <div className="redflag-guide-grid">
              {filteredRedFlags.map((flag) => (
                <div
                  key={flag.id}
                  className="redflag-guide-card redflag-guide-card-red"
                >
                  <div>
                    <div className="redflag-guide-card-header">
                      <div className="redflag-guide-icon redflag-guide-icon-red">
                        {getIcon(flag.category)}
                      </div>
                      <div className="flex-1">
                        <div className="redflag-guide-category">
                          {flag.category}
                        </div>
                        <h3 className="redflag-guide-card-title">
                          "{flag.phrase}"
                        </h3>
                      </div>
                    </div>
                    <p className="redflag-guide-card-text">
                      {flag.explanation}
                    </p>
                  </div>

                  <div className="redflag-guide-tip-box">
                    <div className="redflag-guide-tip-box-title">
                      What to Do
                    </div>
                    <p className="redflag-guide-tip-box-text">{flag.what_to_do}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredRedFlags.length === 0 && (
              <div className="redflag-guide-empty">
                No red flags found matching "{searchQuery}"
              </div>
            )}
          </>
        )}

        {/* Tips */}
        {!loading && !error && activeTab === "tips" && (
          <>
            <div className="redflag-guide-grid">
              {filteredTips.map((tip, index) => {
                const tipIcons = [
                  <UserCheck className="w-6 h-6" />,
                  <Search className="w-6 h-6" />,
                  <Shield className="w-6 h-6" />,
                  <Eye className="w-6 h-6" />,
                  <CheckCircle className="w-6 h-6" />,
                  <FileText className="w-6 h-6" />,
                  <DollarSign className="w-6 h-6" />,
                  <AlertTriangle className="w-6 h-6" />,
                ];
                return (
                  <div
                    key={tip.id}
                    className="redflag-guide-card redflag-guide-card-green redflag-guide-tip-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="redflag-guide-tip-icon">
                        {tipIcons[index % tipIcons.length]}
                      </div>
                      <div className="flex-1">
                        <h3 className="redflag-guide-tip-title">{tip.title}</h3>
                        <p className="redflag-guide-card-text">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTips.length === 0 && (
              <div className="redflag-guide-empty">
                No tips found matching "{searchQuery}"
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}