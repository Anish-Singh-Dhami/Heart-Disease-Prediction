import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Doctor } from "@/types";
import { useNavigate } from "react-router-dom";
import { useGetConversationId } from "@/api/ChatApi";
import { useGetPatient } from "@/api/PatientApi";
import { toast } from "sonner";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  const loginMutation = useGetConversationId();
  const { data, isLoading } = useGetPatient();
  const handleChat = (doctor: Doctor) => {
    if (!isLoading && data) {
      loginMutation.mutate(
        { doctorId: doctor._id, patientId: data?._id },
        {
          onSuccess: (data) => {
            navigate(`/patient/chat/${data._id}`);
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    }
  };

  return (
    <Card className="bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl">
      <CardHeader className="flex items-center justify-center pt-4">
        <img
          src={doctor.user.profilePic}
          alt={doctor.user.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-white"
        />
      </CardHeader>
      <CardContent className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">{doctor.user.name}</h3>
        <p className="text-sm text-gray-300">{doctor.qualification}</p>
        <p className="text-sm text-gray-400">Expertise: {doctor.expertise}</p>
        <p className="text-sm text-gray-400">
          Experience: {doctor.yearOfExperience} years
        </p>
        {doctor.user.country && (
          <p className="text-sm text-gray-500">
            📍 {doctor.user.country}, {doctor.user.state}
          </p>
        )}
        <Button onClick={() => handleChat(doctor)} className="mt-2 w-full">
          Chat with Doctor
        </Button>
      </CardContent>
    </Card>
  );
};
