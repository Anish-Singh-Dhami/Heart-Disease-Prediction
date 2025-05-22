import type { User } from "@/types";
import { useQuery, useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useAuth = () => {
  const getCurrentLoggedInUser = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
      credentials: "include", // send cookie
    });
    if (!response.ok) {
      const errorRes = await response.json();
      console.log("get current user error:", errorRes.message);
      throw new Error("Unauthorised user!");
    }
    return response.json();
  };

  const query = useQuery({
    queryKey: ["current user"],
    queryFn: getCurrentLoggedInUser,
    staleTime: 5 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    currentUser: query.data,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
  };
};

const useLogin = () => {
  const loginApi = async (data: FormData): Promise<void> => {
    console.log("API_BASE_URL : ", API_BASE_URL);
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (!res.ok) {
      const errorRes = await res.json();
      console.log("Login failed: ", errorRes.message);
      throw new Error(errorRes.message || "Login failed");
    }
  };
  return useMutation({ mutationFn: loginApi });
};

const useSignup = () => {
  const signupApi = async (data: FormData): Promise<void> => {
    console.log("API_BASE_URL : ", API_BASE_URL);
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (!res.ok) {
      const errorRes = await res.json();
      throw new Error(errorRes.message || "Signup failed");
    }
  };

  return useMutation({ mutationFn: signupApi });
};

const useLogout = () => {
  const logoutApi = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Logout Failed");
    }
  };
  return useMutation({ mutationFn: logoutApi });
};

export { useAuth, useLogin, useSignup, useLogout };
