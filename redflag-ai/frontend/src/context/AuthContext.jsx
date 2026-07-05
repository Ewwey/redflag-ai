import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(/** @type {any} */ (null));

const API = import.meta.env.VITE_API_BASE_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const stored = localStorage.getItem("redflagUser");

        if (!stored) {
          setLoading(false);
          return;
        }

        const data = JSON.parse(stored);

        if (!data.token) {
          localStorage.removeItem("redflagUser");
          setLoading(false);
          return;
        }

        // Set token immediately so authenticated requests work
        setToken(data.token);

        // Always verify with backend to get fresh user data including display_name
        const response = await axios.get(`${API}/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const freshUser = response.data;
        setUser(freshUser);

        // Update localStorage with fresh user data so next startup has display_name
        localStorage.setItem("redflagUser", JSON.stringify({
          ...data,
          user: freshUser,
        }));

      } catch {
        localStorage.removeItem("redflagUser");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (data) => {
    const payload = {
      token: data.token,
      tokenType: data.tokenType || "bearer",
      user: data.user ?? null,
    };

    localStorage.setItem("redflagUser", JSON.stringify(payload));

    // Set user immediately from login response (has display_name from backend)
    setUser(data.user ?? null);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.removeItem("redflagUser");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}