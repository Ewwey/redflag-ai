import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navbar } from "./Navbar";
import { CheckCircle, AlertCircle, User, Lock, AlertTriangle } from "lucide-react";
import "../../styles/settingspage.css";
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
    <div className="settings-page">
      <Navbar
        isLoggedIn={!!user}
        userName={user?.display_name || user?.name || user?.email || "User"}
      />

      <div className="settings-page__container">
        <h1 className="settings-page__title">Profile & Security Settings</h1>
        <p className="settings-page__subtitle">Manage your account information and security preferences.</p>

        {/* Profile Information Section */}
        <div className="settings-page__section">
          <div className="settings-page__section-header">
            <div className="settings-page__section-icon settings-page__section-icon--blue">
              <User className="w-5 h-5" />
            </div>
            <h2 className="settings-page__section-title">Profile Information</h2>
          </div>

          {profileAlert === "success" && (
            <div className="settings-page__alert--success">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-500">{profileMessage}</span>
            </div>
          )}

          {profileAlert === "error" && (
            <div className="settings-page__alert--error">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-500">{profileMessage}</span>
            </div>
          )}

          <form onSubmit={handleProfileSave} className="settings-page__form">
            <div className="settings-page__field">
              <label htmlFor="displayName" className="settings-page__label">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="settings-page__input"
              />
            </div>

            <div className="settings-page__field">
              <label htmlFor="email" className="settings-page__label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="settings-page__input"
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="settings-page__submit-btn"
            >
              {profileLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Security / Change Password Section */}
        <div className="settings-page__section">
          <div className="settings-page__section-header">
            <div className="settings-page__section-icon settings-page__section-icon--purple">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="settings-page__section-title">Security</h2>
          </div>

          {passwordAlert === "success" && (
            <div className="settings-page__alert settings-page__alert--success">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-green-500">{passwordMessage}</span>
            </div>
          )}

          {passwordAlert === "error" && (
            <div className="settings-page__alert settings-page__alert--error">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-500">{passwordMessage}</span>
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="settings-page__form">
            <div className="settings-page__field">
              <label htmlFor="currentPassword" className="settings-page__label">
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="settings-page__input"
              />
            </div>

            <div className="settings-page__field">
              <label htmlFor="newPassword" className="settings-page__label">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="settings-page__input"
              />
            </div>

            <div className="settings-page__field">
              <label htmlFor="confirmPassword" className="settings-page__label">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="settings-page__input"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="settings-page__submit-btn"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="settings-page__danger-zone">
          <div className="settings-page__danger-header">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="settings-page__danger-title">Danger Zone</h2>
          </div>
          <p className="settings-page__danger-text">
            Once you delete your account, there is no going back. All your scan history and data will be permanently removed.
          </p>
          <button className="settings-page__danger-btn">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}