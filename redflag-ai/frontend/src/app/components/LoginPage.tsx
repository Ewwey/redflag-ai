import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield } from "lucide-react";

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
    <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-red-600" />
              <span className="text-xl font-semibold">RedFlag AI</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <div>
              <a href="#" className="text-sm text-red-600 hover:text-red-500 transition-colors">
                Forgot password?
              </a>
            </div>

            <div className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-red-600 hover:text-red-500 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
