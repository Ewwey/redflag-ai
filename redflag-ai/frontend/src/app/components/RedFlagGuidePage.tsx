import { useState } from "react";
import { Navbar } from "./Navbar";
import { Search, MessageSquare, DollarSign, Clock, Mail, AlertTriangle, CheckCircle, Eye, Shield, UserCheck, FileText } from "lucide-react";

type Tab = "red-flags" | "tips";

interface RedFlag {
  phrase: string;
  category: string;
  explanation: string;
  whatToDo: string;
  icon: React.ReactNode;
}

interface SafetyTip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const redFlags: RedFlag[] = [
  {
    phrase: "Contact us on Telegram",
    category: "Suspicious Contact Method",
    explanation: "Legitimate companies use professional channels like email or their official website. Moving to messaging apps like Telegram, WhatsApp, or WeChat is a common scam tactic to avoid accountability.",
    whatToDo: "Only communicate through the company's official email or application portal. Research the company's website.",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    phrase: "Pay registration/training fee",
    category: "Upfront Payment Required",
    explanation: "Real employers never ask you to pay for the opportunity to work. Asking for money for training materials, background checks, or account activation is a major red flag.",
    whatToDo: "Never send money to an employer. Report the posting to the job board immediately.",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    phrase: "Earn $5000+ with no experience",
    category: "Unrealistic Compensation",
    explanation: "Promises of very high pay for minimal work, especially for entry-level or no-experience positions, are designed to lure desperate job seekers.",
    whatToDo: "Research typical salaries for the position on sites like Glassdoor or Payscale. If it sounds too good to be true, it probably is.",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    phrase: "Immediate start, no interview",
    category: "Too Easy to Get Hired",
    explanation: "Legitimate employers have a hiring process that includes interviews and verification. Scammers want to hook you quickly before you have time to think.",
    whatToDo: "Be suspicious of any job that doesn't require an interview or verification of your skills.",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    phrase: "Use personal email (Gmail, Yahoo)",
    category: "Unprofessional Communication",
    explanation: "Real companies use company email addresses (@companyname.com), not free personal email services.",
    whatToDo: "Verify the email domain matches the company website. Look up the company's official contact information.",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    phrase: "Vague job description",
    category: "Lack of Clear Details",
    explanation: "Scam posts often have unclear responsibilities, requirements, or company information. This vagueness hides the true nature of the 'job'.",
    whatToDo: "Look for specific details about job duties, qualifications, and the company. Research the company online.",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
];

const safetyTips: SafetyTip[] = [
  {
    title: "Verify the company on LinkedIn",
    description: "Check if the company has an official LinkedIn page with real employees and a history. Look for the hiring manager's profile.",
    icon: <UserCheck className="w-6 h-6" />,
  },
  {
    title: "Google the company name + 'scam'",
    description: "A simple search can reveal warnings from other job seekers who encountered the same scam. Check reviews on Glassdoor too.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    title: "Never share sensitive personal info upfront",
    description: "Don't provide your SSS number, bank details, or government IDs until you've verified the company and received an official offer letter.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Trust your instincts",
    description: "If something feels off, it probably is. Don't let urgency or pressure override your judgment. Take time to research.",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    title: "Verify job posts on official company websites",
    description: "If you see a job posted on a third-party site, visit the company's official careers page to confirm it's real.",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    title: "Watch for poor grammar and spelling",
    description: "Professional companies proofread their job postings. Multiple typos and grammatical errors are warning signs.",
    icon: <FileText className="w-6 h-6" />,
  },
];

export function RedFlagGuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>("red-flags");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRedFlags = redFlags.filter(
    (flag) =>
      flag.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar isLoggedIn userName="Juan D." />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Red Flag Guide</h1>
        <p className="text-gray-400 mb-8">
          Learn to identify job scams and protect yourself while searching for opportunities online.
        </p>

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
            Common Red Flags
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "tips"
                ? "border-red-600 text-red-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Safe Job-Hunting Tips
          </button>
        </div>

        {/* Red Flags Tab */}
        {activeTab === "red-flags" && (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search red flags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Red Flag Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRedFlags.map((flag, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-red-600/30 rounded-lg p-6 hover:border-red-600/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0 text-red-500">
                      {flag.icon}
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
                  <p className="text-gray-300 mb-3 text-sm leading-relaxed">
                    {flag.explanation}
                  </p>
                  <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-3">
                    <div className="text-xs uppercase text-green-500 font-semibold mb-1">
                      What to Do
                    </div>
                    <p className="text-sm text-gray-300">{flag.whatToDo}</p>
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

        {/* Safety Tips Tab */}
        {activeTab === "tips" && (
          <div className="space-y-4">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 hover:border-green-600/50 rounded-lg p-6 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0 text-green-500">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
