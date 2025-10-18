import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const { loading } = useUI();

  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}
