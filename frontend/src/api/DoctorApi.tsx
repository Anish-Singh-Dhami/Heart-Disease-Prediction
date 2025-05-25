import { type Doctor } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_DOCTOR = import.meta.env.VITE_API_DOCTOR;

const useGetAvailableDoctors = () => {
  const getAllDoctorsRequest = async (): Promise<Doctor[]> => {
    const response = await fetch(`${API_BASE_URL}/${API_DOCTOR}/all`, {
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
    const response = await fetch(`${API_BASE_URL}/${API_DOCTOR}`, {
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

const useUpdateDoctorDetails = () => {
  const updateDoctorDetails = async (formData: FormData): Promise<Doctor> => {
    const res = await fetch(`${API_BASE_URL}/${API_DOCTOR}/update`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Failed to update user details!");
    }
    return res.json();
  };
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: updateDoctorDetails,
  });
  if (isSuccess) {
    // queryClient.invalidateQueries({ queryKey: ["getDoctorApi"] });
    toast.success("User Details updated successfully!");
  }
  if (isError) {
    toast.error("Failed to update user details.");
  }
  return { updateUser: mutate, isUpdateLoading: isPending };
};

export { useGetAvailableDoctors, useGetDoctor, useUpdateDoctorDetails };
