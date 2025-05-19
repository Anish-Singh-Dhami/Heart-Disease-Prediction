import { loginApi } from "@/api/LoginApi";
import { signupApi } from "@/api/SignupApi";
import { Role, type User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";


type JWTPayload = {
  user: User;
};

export type AuthContextType = {
  /**
   * Undefined: Promise pending.
   * Null: Promise Rejected.
   * String : Promise resolved.
   */
  authToken?: string | null;
  /**
   * Undefined: Promise pending.
   * Null: promise rejected.
   * User: Promise resolved.
   */
  currentUser?: User | null;
  handleSignup: (formData: FormData) => Promise<void>;
  handleLogin: (formData: FormData) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      console.log("Token received : ", data.token);
      console.log("User received : ", data.user);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      setCurrentUser(data.user);
      navigate(
        `${
          location.pathname.startsWith("/patient")
            ? "/patient/prediction/form"
            : "/doctor/chat"
        }`
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: ({ data }) => {
      const { token, user } = data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      setCurrentUser(user);
      navigate(
        `${
          location.pathname.startsWith("/patient")
            ? "/patient/prediction/form"
            : "/doctor/chat"
        }`
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // create new user in our backend.
  const handleSignup = async (formData: FormData) => {
    signupMutation.mutate(formData);
  };

  // check the user's credentials.
  const handleLogin = async (formData: FormData) => {
    console.log("Handle Login form data ", formData);
    loginMutation.mutate(formData);
  };
  // logs out current loggedin user.
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setCurrentUser(null);
    const role = currentUser?.role;
    if (role == Role.DOCTOR) navigate("/doctor/login");
    else navigate("/patient/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decode = jwtDecode<JWTPayload>(storedToken);
        setAuthToken(storedToken);
        setCurrentUser(decode.user);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authToken,
        handleLogin,
        handleLogout,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside of an AuthProvider!!!");
  }
  return context;
};

export { useAuth, AuthProvider };
