import { useAuth } from "@/api/AuthApi";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (!isAuthenticated) return <Navigate to="/patient/login" replace />;
  if (isLoading) return <h1>Loding...</h1>;
  return <Outlet />;
};
export { ProtectedRoutes };
