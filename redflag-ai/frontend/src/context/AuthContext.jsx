import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

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

        // Verify token with backend
        const response = await axios.get(`${API}/auth/me`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        setUser(response.data);
        setToken(data.token);
      } catch (error) {
        // Invalid or expired token
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
    localStorage.setItem("redflagUser", JSON.stringify(data));

    setUser(data.user);
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