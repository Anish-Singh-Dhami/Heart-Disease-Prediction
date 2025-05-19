import { useAuth } from "@/auth/AuthContext";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUserIcon } from "lucide-react";

const UserMenu: React.FC = () => {
  const { handleLogout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-none focus:outline-none ring-0 focus:ring-0 my-5 mx-2">
        <DropdownMenuItem>
          <Button
            onClick={() => handleLogout()}
            className="bg-gray-800 flex items-center w-full outline-none focus:ring-0 ring-0 hover:bg-gray-700 focus:outline-none"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { UserMenu };
