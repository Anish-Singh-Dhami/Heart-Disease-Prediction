// components/ChatSidebar.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatPartners } from "@/api/ChatApi";

export const ChatSidebar = () => {
  const { userId } = useParams();
  const { data, isLoading } = useChatPartners();
  const navigate = useNavigate();
  const location = useLocation();

  const activeUserId = location.pathname.split("/").pop();

  return (
    <div className="w-1/3 max-w-sm h-full overflow-y-auto border-r bg-gray-900 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg bg-gray-700" />
            ))
          : data?.map((partner) => (
              <Link
                to={`/chat/${partner._id}`}
                key={partner._id}
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-800 ${
                  activeUserId === partner._id ? "bg-gray-800" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src={partner.profilePic} />
                  <AvatarFallback>{partner.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{partner.name}</p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};
