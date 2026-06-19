import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { login } from "../../services/authService";
import "../../styles/login.css";

type FieldErrors = {
  email?: string;
  password?: string;
  general?: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FieldErrors => {
    const newErrors: FieldErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password.";
    }

    return newErrors;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      setErrors({});

      const response = await login({
        email: email.trim(),
        password,
      });

      const data = response.data;

      localStorage.setItem(
        "redflagUser",
        JSON.stringify({
          token: data.access_token,
          tokenType: data.token_type || "bearer",
          user: data.user || { email: email.trim() },
          isLoggedIn: true,
          loginTime: new Date().toISOString(),
        })
      );

      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail ||
        "Incorrect email or password. Please try again.";

      setErrors({
        general: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__card">
          <div className="login-page__logo">
            <div className="login-page__logo-wrap">
              <Shield className="login-page__logo-icon" />
              <span className="login-page__logo-text">
                RedFlag AI
              </span>
            </div>
          </div>

          <h2 className="login-page__title">
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit}
            className="login-page__form"
            noValidate
          >
            <div className="login-page__field">
              <label
                htmlFor="email"
                className="login-page__label"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`login-page__input ${
                  errors.email ? "login-page__input--error" : ""
                }`}
              />

              {errors.email && (
                <p className="login-page__error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="login-page__field">
              <label
                htmlFor="password"
                className="login-page__label"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`login-page__input ${
                  errors.password ? "login-page__input--error" : ""
                }`}
              />

              {errors.password && (
                <p className="login-page__error">
                  {errors.password}
                </p>
              )}
            </div>

            {errors.general && (
              <p className="login-page__error login-page__error--general">
                {errors.general}
              </p>
            )}

            <button
              type="submit"
              className="login-page__button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="login-page__links">
            <div>
              <a
                href="#"
                className="login-page__link login-page__link--accent"
              >
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
          <Link
            to="/"
            className="login-page__back-link"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}