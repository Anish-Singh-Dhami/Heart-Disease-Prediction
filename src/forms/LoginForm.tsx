import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { LoadingButton } from "@/components/LoadingButton";
import { Role } from "@/types";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string(),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const location = useLocation();
  const segments = location.pathname.split("/");
  segments[segments.length - 1] = "signup";
  const newLocation = segments.join("/");
  const { currentUser, handleLogin } = useAuth();

  const onSubmit = (data: LoginData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append(
      "role",
      location.pathname.startsWith("/patient") ? Role.PATIENT : Role.DOCTOR
    );
    handleLogin(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-6 ">
        <h1 className="text-2xl font-bold text-white text-center">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 text-white placeholder:text-gray-400"
                      placeholder="Enter email"
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="bg-gray-800 text-white placeholder:text-gray-400"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {currentUser === undefined ? (
              <LoadingButton loadingText="loging in.." />
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login
              </Button>
            )}
          </form>
        </Form>
        <div className="text-sm text-center mt-2 text-white">
          Don't have an account?{" "}
          <Link to={newLocation} className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export { LoginForm };
