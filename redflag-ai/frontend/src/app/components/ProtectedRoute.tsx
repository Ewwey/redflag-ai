import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" />;
}