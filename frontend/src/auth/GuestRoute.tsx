import { useAuth } from "@/api/AuthApi";
import { Role } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    const isPatient = currentUser.role === Role.PATIENT;
    return isPatient ? (
      <Navigate to={`/patient/prediction/form`} replace />
    ) : (
      <Navigate to={`/doctor/chat`} replace />
    );
  }
  return <Outlet />;
};
export { GuestRoute };
