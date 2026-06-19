import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield } from "lucide-react";
import "../../styles/login.css";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    const loginData = {
      email,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem("redflagUser", JSON.stringify(loginData));
    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__card">
          <div className="login-page__logo">
            <div className="login-page__logo-wrap">
              <Shield className="login-page__logo-icon" />
              <span className="login-page__logo-text">RedFlag AI</span>
            </div>
          </div>

          <h2 className="login-page__title">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="login-page__form">
            <div className="login-page__field">
              <label htmlFor="email" className="login-page__label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-page__input"
              />
            </div>

            <div className="login-page__field">
              <label htmlFor="password" className="login-page__label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-page__input"
              />
            </div>

            {error && <p className="login-page__error">{error}</p>}

            <button type="submit" className="login-page__button">
              Log In
            </button>
          </form>

          <div className="login-page__links">
            <div>
              <a href="#" className="login-page__link login-page__link--accent">
                Forgot password?
              </a>
            </div>

            <div className="login-page__signup-text">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="login-page__link login-page__link--accent"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className="login-page__back">
          <Link to="/" className="login-page__back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
