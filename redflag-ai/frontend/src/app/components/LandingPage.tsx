import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/landingpage.css";
import { Link } from "react-router-dom";
import { Shield, Zap, Target, Mail, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

export function LandingPage() {
  const auth = useContext(AuthContext) as any;
  if (auth?.isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav__inner">
          <div className="landing-nav__logo">
            <div className="landing-nav__logo-icon-wrap">
              <Shield className="landing-nav__logo-icon" />
            </div>
            <span className="landing-nav__logo-text">RedFlag AI</span>
          </div>
          <div className="landing-nav__links">
            <a href="#about" className="landing-nav__link">About</a>
            <a href="#features" className="landing-nav__link">How it Works</a>
            <a href="#contact" className="landing-nav__link">Contact</a>
          </div>
          <div className="landing-nav__cta">
            <Link to="/login" className="landing-nav__login">
              Log In
            </Link>
            <Link
              to="/register"
              className="landing-nav__signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section className="landing-hero">
          {/* Subtle Background Glows */}
          <div className="landing-hero__glows">
            <div className="landing-hero__glow-red" />
            <div className="landing-hero__glow-blue" />
          </div>

          <div className="landing-hero__inner">
            <div className="landing-hero__badge">

              <ShieldAlert className="landing-hero__badge-icon" />
              Trusted by 5,000+ Pinoy Job Seekers
            </div>
            
            <h1 className="landing-hero__heading">
              Don't Fall for the <br />
              <span className="landing-hero__heading-accent">Employment Trap.</span>
            </h1>
            
            <p className="landing-hero__sub">
              Instantly identify predatory job offers, fake recruiters, and salary scams. Our AI is trained specifically for the Philippine job market.
            </p>

            <div className="landing-hero__cta">
              <Link
                to="/scan"
                className="landing-hero__btn-primary"
              >
                Scan Job Post Now
                <ArrowRight className="landing-hero__btn-primary-icon" />
              </Link>
              <a 
                href="#features"
                className="landing-hero__btn-secondary"
              >
                How it detects scams
              </a>
            </div>

            {/* Trust Badges */}
            <div className="landing-hero__trust">
              <span className="landing-hero__trust-item">SafeHunt PH</span>
              <span className="landing-hero__trust-item">CareerGuard</span>
              <span className="landing-hero__trust-item">Anti-Scam Alliance</span>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="landing-features">
          <div className="landing-features__inner">
            <div className="landing-features__grid">
              <FeatureCard 
                icon={<Zap className="feature-card__icon" />}
                title="Instant Analysis"
                description="Get a comprehensive safety report in under 3 seconds. No more waiting, no more guessing."
              />
              <FeatureCard 
                icon={<Target className="feature-card__icon" />}
                title="Local Context"
                description="Recognizes regional scam patterns like 'Task-based' Telegram scams and fake BPO fly-by-night ads."
              />
              <FeatureCard 
                icon={<CheckCircle2 className="feature-card__icon" />}
                title="Red Flag Breakdown"
                description="We don't just say 'Scam'—we point out exactly why, from salary mismatch to suspicious URLs."
              />
            </div>
          </div>
        </section>

        {/* ABOUT & CONTACT SECTION */}
        <section id="about" className="landing-about">
          <div className="landing-about__inner">
            <div className="landing-about__grid">
              <div>
                <h2 className="landing-about__heading">
                  Protecting the Future of <br />
                  <span className="landing-about__heading-accent">Filipino Remote Work</span>
                </h2>
                <div className="landing-about__body">
                  <p>
                    RedFlag AI was born out of a simple observation: job scams are becoming increasingly sophisticated, targeting vulnerable job seekers in the Philippines.
                  </p>
                  <p>
                    Our mission is to level the playing field. By leveraging advanced Natural Language Processing (NLP), we provide every Pinoy with the tools of a professional security researcher.
                  </p>
                </div>
                
                <div id="contact" className="landing-contact">
                  <div className="landing-contact__icon-wrap">
                    <Mail className="landing-contact__icon" />
                  </div>
                  <div>
                    <h4 className="landing-contact__title">Need help or want to partner?</h4>
                    <p className="landing-contact__sub">Our team is available for media inquiries and support.</p>
                    <a href="mailto:support@redflag.ai" className="landing-contact__email">
                      support@redflag.ai
                    </a>
                  </div>
                </div>
              </div>

              <div className="landing-about__card-wrap">
                <div className="landing-about__card-glow" />
                <div className="landing-about__card">
                  <h3 className="landing-about__card-title">Common Red Flags We Find:</h3>
                  <ul className="landing-about__flags-list">
                    {[
                      "Unrealistic 'Too good to be true' salaries",
                      "Requests for 'processing fees' or equipment payments",
                      "Vague job descriptions without company names",
                      "Recruiters using personal Gmail/Yahoo accounts",
                      "Pressure to move to encrypted chat apps immediately"
                    ].map((item, i) => (
                      <li key={i} className="landing-about__flag-item">
                        <div className="landing-about__flag-dot" />
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
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="landing-footer__logo">
            <Shield className="landing-footer__logo-icon" />
            <span className="landing-footer__logo-text">RedFlag AI</span>
          </div>
          <p className="landing-footer__copy">
            &copy; {new Date().getFullYear()} RedFlag AI. Built for the Filipino community.
          </p>
          <div className="landing-footer__links">
            <a href="#" className="landing-footer__link">Privacy</a>
            <a href="#" className="landing-footer__link">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card">
      <div className="feature-card__icon-wrap">
        {icon}
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
    </div>
  );
}