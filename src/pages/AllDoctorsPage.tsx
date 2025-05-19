import { DoctorsGrid } from "@/components/DoctorsGrid";
import { type Doctor } from "@/types";

const doctorsMock: Doctor[] = [
  {
    id: "1",
    name: "Dr. Aditi Sharma",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    yearsOfExperience: 8,
    expertise: "Cardiologist",
    qualification: "MBBS, MD (Cardiology)",
    location: "Delhi, India",
  },
  {
    id: "2",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/40.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "3",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/30.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "4",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/20.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "5",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/37.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  {
    id: "6",
    name: "Dr. Rahul Verma",
    profilePic: "https://randomuser.me/api/portraits/men/38.jpg",
    yearsOfExperience: 5,
    expertise: "Neurologist",
    qualification: "MBBS, DM (Neurology)",
    location: "Mumbai, India",
  },
  // Add more
];

export default function AllDoctorsPage() {
  const isLoading = false;
  doctorsMock[0]
  return (
    <div className="min-h-screen bg-gray-900">
      <h2 className="text-3xl font-bold text-white text-center py-8">
        Available Doctors
      </h2>
      <DoctorsGrid doctors={doctorsMock} isLoading={isLoading} />
    </div>
  );
}
