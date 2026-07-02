import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return /** @type {{ user: any, token: string|null, loading: boolean, isAuthenticated: boolean, login: (data: any) => void, logout: () => void }} */ (ctx);
}
