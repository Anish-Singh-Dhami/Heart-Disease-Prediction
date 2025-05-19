import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  const { authToken } = useAuth();
  if (authToken === null) return <Navigate to="/patient/login" replace />;
  if (authToken === undefined) return <h1>Loding...</h1>;
  return <Outlet />;
};
export { ProtectedRoutes };
