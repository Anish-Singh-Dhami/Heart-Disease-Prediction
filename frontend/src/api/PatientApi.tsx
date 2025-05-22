import type { Patient } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const useGetPatient = () => {
  const getPatientApi = async (): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/api/patient`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorRes = await response.json();
      throw new Error(errorRes.message || "Failed to get user details");
    }
    return response.json();
  };
  return useQuery({
    queryKey: ["getPatientApi"],
    queryFn: getPatientApi,
  });
};

export { useGetPatient };
