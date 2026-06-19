import { Link } from "react-router-dom";
import { Shield, Zap, Target, Mail, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-sans selection:bg-red-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D1117]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-red-600 p-1.5 rounded-lg transition-transform group-hover:scale-110 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">RedFlag AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#features" className="hover:text-white transition-colors">How it Works</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-red-500 transition-colors">
              Log In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-8">
              <ShieldAlert className="w-4 h-4" />
              Trusted by 5,000+ Pinoy Job Seekers
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 leading-tight">
              Don't Fall for the <br />
              <span className="text-red-600 underline decoration-red-600/20 underline-offset-8">Employment Trap.</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Instantly identify predatory job offers, fake recruiters, and salary scams. Our AI is trained specifically for the Philippine job market.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/scan"
                className="group w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-900/20"
              >
                Scan Job Post Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-lg font-semibold transition-colors"
              >
                How it detects scams
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-lg italic text-gray-400">SafeHunt PH</span>
              <span className="font-bold text-lg italic text-gray-400">CareerGuard</span>
              <span className="font-bold text-lg italic text-gray-400">Anti-Scam Alliance</span>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-24 bg-white/[0.02] border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Zap className="text-red-500" />}
                title="Instant Analysis"
                description="Get a comprehensive safety report in under 3 seconds. No more waiting, no more guessing."
              />
              <FeatureCard 
                icon={<Target className="text-red-500" />}
                title="Local Context"
                description="Recognizes regional scam patterns like 'Task-based' Telegram scams and fake BPO fly-by-night ads."
              />
              <FeatureCard 
                icon={<CheckCircle2 className="text-red-500" />}
                title="Red Flag Breakdown"
                description="We don't just say 'Scam'—we point out exactly why, from salary mismatch to suspicious URLs."
              />
            </div>
          </div>
        </section>

        {/* ABOUT & CONTACT SECTION */}
        <section id="about" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  Protecting the Future of <br />
                  <span className="text-red-600">Filipino Remote Work</span>
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    RedFlag AI was born out of a simple observation: job scams are becoming increasingly sophisticated, targeting vulnerable job seekers in the Philippines.
                  </p>
                  <p>
                    Our mission is to level the playing field. By leveraging advanced Natural Language Processing (NLP), we provide every Pinoy with the tools of a professional security researcher.
                  </p>
                </div>
                
                <div id="contact" className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-600/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Need help or want to partner?</h4>
                    <p className="text-gray-400 mb-3">Our team is available for media inquiries and support.</p>
                    <a href="mailto:support@redflag.ai" className="text-red-600 font-bold hover:underline underline-offset-4">
                      support@redflag.ai
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-red-600/20 to-transparent blur-2xl -z-10" />
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl">
                  <h3 className="text-xl font-bold mb-6 text-white">Common Red Flags We Find:</h3>
                  <ul className="space-y-4">
                    {[
                      "Unrealistic 'Too good to be true' salaries",
                      "Requests for 'processing fees' or equipment payments",
                      "Vague job descriptions without company names",
                      "Recruiters using personal Gmail/Yahoo accounts",
                      "Pressure to move to encrypted chat apps immediately"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <span className="font-bold">RedFlag AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} RedFlag AI. Built for the Filipino community.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-red-600/50 transition-all hover:-translate-y-1 shadow-sm">
      <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
