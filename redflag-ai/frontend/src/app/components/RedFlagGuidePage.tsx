import { useState, useEffect, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Search, MessageSquare, DollarSign, Clock, Mail, AlertTriangle, CheckCircle, Eye, Shield, UserCheck, FileText, Loader2 } from "lucide-react";
import axios from "axios";

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
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Red Flag Guide</h1>
        <p className="text-gray-400 mb-8">
          Learn to identify job scams and protect yourself while searching for opportunities online.
        </p>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeTab === "red-flags" ? "Search red flags..." : "Search safety tips..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("red-flags")}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "red-flags"
                ? "border-red-600 text-red-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Common Red Flags {!loading && `(${redFlags.length})`}
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "tips"
                ? "border-green-600 text-green-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Safe Job-Hunting Tips {!loading && `(${tips.length})`}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading guide content...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12 text-red-400 text-sm">{error}</div>
        )}

        {/* Red Flags */}
        {!loading && !error && activeTab === "red-flags" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRedFlags.map((flag) => (
                <div
                  key={flag.id}
                  className="bg-white/5 border border-red-600/20 rounded-lg p-6 hover:border-red-600/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0 text-red-500">
                        {getIcon(flag.category)}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs uppercase text-red-500 font-semibold mb-1">
                          {flag.category}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          "{flag.phrase}"
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {flag.explanation}
                    </p>
                  </div>

                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3 mt-auto">
                    <div className="text-xs uppercase text-green-500 font-semibold mb-1">
                      What to Do
                    </div>
                    <p className="text-sm text-gray-300">{flag.what_to_do}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredRedFlags.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No red flags found matching "{searchQuery}"
              </div>
            )}
          </>
        )}

        {/* Tips */}
        {!loading && !error && activeTab === "tips" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="bg-white/5 border border-green-600/20 hover:border-green-600/50 rounded-lg p-6 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 text-green-500">
                        {tipIcons[index % tipIcons.length]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-white">{tip.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTips.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                No tips found matching "{searchQuery}"
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}