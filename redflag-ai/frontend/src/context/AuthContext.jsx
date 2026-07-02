import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(/** @type {any} */ (null));

const API = import.meta.env.VITE_API_BASE_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session + validate token on app startup
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

        // Use stored user first if present (e.g. { email } from LoginPage)
        if (data.user) {
          setUser(data.user);
        }

        // Verify token with backend + get real user data
        const response = await axios.get(`${API}/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        setUser(response.data);
        setToken(data.token);
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

  // data comes from LoginPage:
  // { token, tokenType, user: { email } }
  const login = (data) => {
    const payload = {
      token: data.token,
      tokenType: data.tokenType || "bearer",
      user: data.user ?? null,
    };

    localStorage.setItem("redflagUser", JSON.stringify(payload));

    setUser(payload.user);
    setToken(payload.token);
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
