import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useState } from "react";
import { register } from "../../services/authService";
import "../../styles/registerpage.css";

type FormErrors = Partial<
  Record<"displayName" | "email" | "password" | "confirmPassword" | "general", string>
>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFields = () => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!displayName.trim()) {
      nextErrors.displayName = "Display name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await register({
        display_name: displayName.trim(),
        email: email.trim(),
        password,
      });
      navigate("/login");
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response?.data?.detail
          ? String((error as any).response.data.detail)
          : "Unable to create account. Please try again.";
      setErrors({ general: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          {/* Logo */}
          <div className="register-logo">
            <div className="register-logo-inner">
              <Shield className="register-logo-icon" />
              <span className="register-logo-text">RedFlag AI</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="register-heading">Create Your Account</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            {errors.general ? (
              <div className="register-error-banner">
                {errors.general}
              </div>
            ) : null}

            <div>
              <label htmlFor="displayName" className="register-label">
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                type="text"
                placeholder="Juan Dela Cruz"
                className="register-input"
              />
              {errors.displayName ? (
                <p className="register-field-error">{errors.displayName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="register-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="your.email@example.com"
                className="register-input"
              />
              {errors.email ? <p className="register-field-error">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="register-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                className="register-input"
              />
              {errors.password ? (
                <p className="register-field-error">{errors.password}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="register-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                className="register-input"
              />
              {errors.confirmPassword ? (
                <p className="register-field-error">{errors.confirmPassword}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="register-submit-btn"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Links */}
          <div className="register-footer">
            <div className="register-back-link">
              Already have an account?{" "}
              <Link to="/login" className="register-login-link">
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="register-back">
          <Link to="/" className="register-back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
