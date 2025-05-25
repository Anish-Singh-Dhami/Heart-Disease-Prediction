import type { Patient } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PATIENT = import.meta.env.VITE_API_PATIENT;

const useGetPatient = () => {
  const getPatientApi = async (): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/${API_PATIENT}`, {
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

const useUpdatePatientDetails = () => {
  const updatePatientDetails = async (formData: FormData): Promise<Patient> => {
    const res = await fetch(`${API_BASE_URL}/${API_PATIENT}/update`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to Update user details!");
    }
    return res.json();
  };

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: updatePatientDetails,
  });

  if (isSuccess) {
    toast.success("User Details updated successfully!");
  }
  if (isError) {
    toast.error("Failed to update user details.");
  }
  return { updateUser: mutate, isUpdateLoading: isPending };
};

export { useGetPatient, useUpdatePatientDetails };
