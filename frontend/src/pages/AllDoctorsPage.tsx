import { useGetAvailableDoctors } from "@/api/DoctorApi";
import { DoctorsGrid } from "@/components/DoctorsGrid";

export default function AllDoctorsPage() {
  const { data: result, isLoading } = useGetAvailableDoctors();
  return (
    <div className="min-h-screen bg-gray-900">
      <h2 className="text-3xl font-bold text-white text-center py-8">
        Available Doctors
      </h2>
      <DoctorsGrid doctors={result} isLoading={isLoading} />
    </div>
  );
}
