import { Link } from "react-router";
import { Shield, Zap, Target } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-600" />
            <span className="text-xl font-semibold">RedFlag AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Don't Fall for the Trap.
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Paste any job post and our AI will tell you if it's a scam in seconds.
        </p>
        <Link
          to="/scan"
          className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold transition-colors inline-flex items-center gap-2"
        >
          Scan a Job Post — It's Free
          <Shield className="w-5 h-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-600/50 transition-colors">
            <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-400">
              Advanced machine learning models trained on thousands of job scams to detect red flags instantly.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-600/50 transition-colors">
            <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Scam Score</h3>
            <p className="text-gray-400">
              Get a clear risk assessment in seconds, from safe to high-risk, with confidence ratings.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-red-600/50 transition-colors">
            <div className="w-12 h-12 bg-red-600/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Red Flag Breakdown</h3>
            <p className="text-gray-400">
              Detailed analysis of suspicious elements like unrealistic promises, unclear requirements, and more.
            </p>
          </div>
        </div>
      </section>

      {/* About/Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About RedFlag AI</h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            RedFlag AI was created to protect Filipino online job seekers from employment scams.
            Our mission is to make job hunting safer by leveraging artificial intelligence to identify
            fraudulent job postings before they can harm job seekers. We analyze job posts for common
            scam indicators and provide instant feedback to help you make informed decisions.
          </p>
          <div className="inline-flex items-center gap-2 text-red-600 hover:text-red-500 transition-colors">
            <span>Contact us:</span>
            <a href="mailto:support@redflag.ai" className="underline">
              support@redflag.ai
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-400">
          <p>&copy; 2026 RedFlag AI. Protecting Filipino job seekers.</p>
        </div>
      </footer>
    </div>
  );
}
