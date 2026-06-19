import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { useState } from "react";
import { register } from "../../services/authService";

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
    <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="bg-slate-950/90 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] rounded-[32px] p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-9 h-9 text-red-500" />
              <span className="text-xl font-semibold tracking-wide">RedFlag AI</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center mb-8">Create Your Account</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errors.general ? (
              <div className="rounded-3xl border border-red-600/30 bg-red-600/10 p-4 text-sm text-red-100 shadow-sm">
                {errors.general}
              </div>
            ) : null}

            <div>
              <label htmlFor="displayName" className="block text-sm mb-2 text-slate-300">
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                type="text"
                placeholder="Juan Dela Cruz"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              />
              {errors.displayName ? (
                <p className="mt-2 text-sm text-red-300">{errors.displayName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="your.email@example.com"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              />
              {errors.email ? <p className="mt-2 text-sm text-red-300">{errors.email}</p> : null}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-slate-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              />
              {errors.password ? (
                <p className="mt-2 text-sm text-red-300">{errors.password}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-slate-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              />
              {errors.confirmPassword ? (
                <p className="mt-2 text-sm text-red-300">{errors.confirmPassword}</p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-red-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-8 text-center space-y-3">
            <div className="text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:text-red-400 transition-colors">
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-5 text-center">
          <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
