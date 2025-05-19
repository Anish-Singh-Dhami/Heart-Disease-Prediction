import type { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type LoginResultType = {
  data: {
    token: string;
    user: User;
  };
};
export const loginApi = async (data: FormData): Promise<LoginResultType> => {
  console.log("API_BASE_URL : ", API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};
