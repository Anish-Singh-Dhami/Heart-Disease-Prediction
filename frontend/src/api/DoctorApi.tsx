import { type Doctor } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetAvailableDoctors = () => {
  const getAllDoctorsRequest = async (): Promise<Doctor[]> => {
    const response = await fetch(`${API_BASE_URL}/api/doctor/all`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errRes = await response.json();
      throw new Error(errRes.message || "Failed to get list of doctors");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["getAllDoctorsRequest"],
    queryFn: getAllDoctorsRequest,
  });
};

const useGetDoctor = () => {
  const getDoctorApi = async (): Promise<Doctor> => {
    const response = await fetch(`${API_BASE_URL}/api/doctor`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.message || "Failed to get User's Data.");
    }
    return response.json();
  };
  return useQuery({
    queryKey: ["getDoctorApi"],
    queryFn: getDoctorApi,
  });
};

export { useGetAvailableDoctors, useGetDoctor };
