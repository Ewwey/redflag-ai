import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}