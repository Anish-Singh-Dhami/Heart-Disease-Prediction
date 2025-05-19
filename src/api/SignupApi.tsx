import type { User } from "@/types";

type SignupResultType = {
  data: {
    token: string;
    user: User;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const signupApi = async (data: FormData): Promise<SignupResultType> => {
  console.log("API_BASE_URL : ", API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    body: data,
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
};

export { signupApi };
