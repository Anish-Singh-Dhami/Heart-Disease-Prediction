import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "@/components/LoadingButton";
import { useAuth, useSignup } from "@/api/AuthApi";
import { Role } from "@/types";
import { toast } from "sonner";

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const form = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.startsWith("/patient")
    ? Role.PATIENT
    : Role.DOCTOR;
  const signupMutation = useSignup();
  const onSubmit = (data: SignupData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", role);
    console.log(
      "Navigate to : ",
      `/${role}/${role === Role.PATIENT ? "prediction/form" : "chat"}`
    );
    signupMutation.mutate(formData, {
      onSuccess: () => {
        navigate(
          `/${role}/${role === Role.PATIENT ? "prediction/form" : "chat"}`
        );
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  const segments = location.pathname.split("/");
  segments[segments.length - 1] = "login";
  const newLocation = segments.join("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 text-white placeholder:text-gray-400"
                      placeholder="Enter username"
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
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
                      autoComplete="new-password"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {signupMutation.isPending ? (
              <LoadingButton loadingText="singing up.." />
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sing Up
              </Button>
            )}
          </form>
        </Form>
        <div className="text-sm text-center mt-2 text-white">
          Already have an account?{" "}
          <Link to={newLocation} className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
