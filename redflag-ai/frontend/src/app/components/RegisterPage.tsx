import { Link, useNavigate } from "react-router";
import { Shield } from "lucide-react";

export function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-red-600" />
              <span className="text-xl font-semibold">RedFlag AI</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-8">Create Your Account</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="displayName" className="block text-sm mb-2 text-gray-300">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                placeholder="Juan Dela Cruz"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
            >
              Sign Up
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 hover:text-red-500 transition-colors">
                Log In
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
