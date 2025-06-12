import { useAuth } from "@/api/AuthApi";
import { useGetDoctor, useUpdateDoctorDetails } from "@/api/DoctorApi";
import { useGetPatient, useUpdatePatientDetails } from "@/api/PatientApi";
import { Role } from "@/types";
import { UserDetailForm } from "@/forms/UserDetailForm";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AccountPage: React.FC = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const { data, isLoading } =
    role === Role.PATIENT ? useGetPatient() : useGetDoctor();
  const { updateUser, isUpdateLoading } =
    role === Role.PATIENT
      ? useUpdatePatientDetails()
      : useUpdateDoctorDetails();
      
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["getDoctorApi"],
    });
    queryClient.invalidateQueries({
      queryKey: ["getPatientApi"],
    });
  }, []);
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-800 items-center justify-center">
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex min-h-screen bg-gray-800 items-center justify-center">
        <span className="text-red-400 text-lg">User data not found.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <UserDetailForm
        role={data.user.role}
        updateUser={updateUser}
        isUpdateLoading={isUpdateLoading}
        userDetail={data}
      />
    </div>
  );
};
export { AccountPage };
