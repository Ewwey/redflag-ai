import { Link } from "react-router-dom";
import { Shield, User, LayoutDashboard, BookOpen } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  userName?: string;
}

export function Navbar({ isLoggedIn = false, userName = "Juan D." }: NavbarProps) {
  return (
    <nav className="border-b border-white/10 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="w-8 h-8 text-red-600" />
            <span className="text-xl font-semibold text-white">RedFlag AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/guide"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Red Flag Guide
            </Link>
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                My Scans
              </Link>
            )}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-300 text-sm">{userName}</span>
            <Link to="/settings" className="w-10 h-10 rounded-full bg-red-600/20 border-2 border-red-600 flex items-center justify-center hover:bg-red-600/30 transition-colors">
              <User className="w-5 h-5 text-red-600" />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
