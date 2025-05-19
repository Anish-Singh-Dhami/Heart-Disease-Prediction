import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Doctor } from "@/types";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/patient/chat?doctorId=${doctor.id}`);
  };

  return (
    <Card className="bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl">
      <CardHeader className="flex items-center justify-center pt-4">
        <img
          src={doctor.profilePic}
          alt={doctor.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-white"
        />
      </CardHeader>
      <CardContent className="space-y-2 text-center">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-sm text-gray-300">{doctor.qualification}</p>
        <p className="text-sm text-gray-400">Expertise: {doctor.expertise}</p>
        <p className="text-sm text-gray-400">
          Experience: {doctor.yearsOfExperience} years
        </p>
        {doctor.location && (
          <p className="text-sm text-gray-500">📍 {doctor.location}</p>
        )}
        <Button onClick={handleChat} className="mt-2 w-full">
          Chat with Doctor
        </Button>
      </CardContent>
    </Card>
  );
};
