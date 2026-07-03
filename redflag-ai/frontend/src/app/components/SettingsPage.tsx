import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar } from "./Navbar";
import { CheckCircle, AlertCircle, User, Lock, AlertTriangle } from "lucide-react";
import axios from "axios";

type AlertType = "success" | "error" | null;

export function SettingsPage() {
  const { user } = useContext(AuthContext) as any;
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileAlert, setProfileAlert] = useState<AlertType>(null);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordAlert, setPasswordAlert] = useState<AlertType>(null);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || user.name || user.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const getToken = () => {
    const storedUser = localStorage.getItem("redflagUser");
    return storedUser ? JSON.parse(storedUser).token : null;
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileAlert(null);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      await axios.put(
        `${baseURL}/profile/`,
        { display_name: displayName, email },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setProfileMessage("Changes saved successfully!");
      setProfileAlert("success");
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setProfileMessage(typeof detail === "string" ? detail : "Failed to save changes. Please try again.");
      setProfileAlert("error");
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileAlert(null), 3000);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordAlert(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      setPasswordAlert("error");
      setTimeout(() => setPasswordAlert(null), 3000);
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.");
      setPasswordAlert("error");
      setTimeout(() => setPasswordAlert(null), 3000);
      return;
    }

    setPasswordLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      await axios.put(
        `${baseURL}/profile/`,
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setPasswordMessage("Password updated successfully!");
      setPasswordAlert("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setPasswordMessage(typeof detail === "string" ? detail : "Failed to update password. Please try again.");
      setPasswordAlert("error");
    } finally {
      setPasswordLoading(false);
      setTimeout(() => setPasswordAlert(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Navbar
        isLoggedIn={!!user}
        userName={user?.display_name || user?.name || user?.email || "User"}
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Profile & Security Settings</h1>
        <p className="text-gray-400 mb-8">Manage your account information and security preferences.</p>

        {/* Profile Information Section */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold">Profile Information</h2>
          </div>

          {profileAlert === "success" && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600/50 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-500">{profileMessage}</span>
            </div>
          )}

          {profileAlert === "error" && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-500">{profileMessage}</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-5">
            <div>
              <label htmlFor="displayName" className="block text-sm mb-2 text-gray-300">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              {profileLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Security / Change Password Section */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold">Security</h2>
          </div>

          {passwordAlert === "success" && (
            <div className="mb-6 p-4 bg-green-600/20 border border-green-600/50 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-500">{passwordMessage}</span>
            </div>
          )}

          {passwordAlert === "error" && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-600/50 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-500">{passwordMessage}</span>
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-5">
            <div>
              <label htmlFor="currentPassword" className="block text-sm mb-2 text-gray-300">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm mb-2 text-gray-300">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm mb-2 text-gray-300">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-600/5 border border-red-600/30 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-red-500">Danger Zone</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Once you delete your account, there is no going back. All your scan history and data will be permanently removed.
          </p>
          <button className="px-6 py-3 border-2 border-red-600 text-red-500 hover:bg-red-600/10 rounded-lg font-semibold transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}