import { useAuth, useLogout } from "@/api/AuthApi";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserIcon, UserIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Role } from "@/types";

const UserMenu: React.FC = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["current user"] });
        navigate(
          `${
            currentUser?.role === Role.PATIENT
              ? "/patient/login"
              : "/doctor/login"
          }`
        );
        console.log("Redirecting to /patient/login");
        toast.success("Logged out successfully");
      },
      onError: () => {
        toast.error("Error while logging out...");
      },
    });
  };
  const location = useLocation();
  const isPatient = location.pathname.startsWith("/patient");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-none my-5 mx-4">
        <DropdownMenuItem className="flex flex-col">
          <Link
            to={isPatient ? "/patient/account" : "/doctor/account"}
            className="text-white flex w-full gap-2 items-center hover:bg-gray-700 bg-gray-800 p-2 rounded-sm"
          >
            <UserIcon color="white" />
            Account
          </Link>
          <Button
            onClick={handleLogout}
            className="bg-gray-800 flex items-center w-full rounded-sm hover:bg-gray-700 focus:outline-none"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { UserMenu };
