import { useAuth } from "@/api/AuthApi";
import { useGetDoctor } from "@/api/DoctorApi";
import { useGetPatient } from "@/api/PatientApi";
import { Role } from "@/types";

const AccountPage: React.FC = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  const { data, isLoading } =
    role === Role.PATIENT ? useGetPatient() : useGetDoctor();
  console.log("data : ", data);
  return (
    <div className="flex min-h-screen bg-gray-800">
      {!isLoading && data? (
        <div>
          <p>{data.user.name}</p>
        <p>{data.user.email}</p>
        </div>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
};
export { AccountPage };
