// components/ChatSidebar.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/api/AuthApi";
import { useGetConversationUser } from "@/api/ChatApi";
import { Role, type Doctor, type Patient } from "@/types";

export const ChatSidebar = () => {
  const { data, isLoading } = useGetConversationUser();
  const { conversationId } = useParams();
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  return (
    <div className="w-1/4 h-full overflow-y-auto border-r bg-gray-900 text-white p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-15 mb-5 rounded-lg bg-gray-700" />
            ))
          : data?.map((converation) => {
              const partner =
                role === Role.DOCTOR
                  ? (converation.patient as Patient)
                  : (converation.doctor as Doctor);
              return (
                <Link
                  to={`/${role}/chat/${converation._id}`}
                  key={converation._id}
                  className={`flex items-center gap-3 p-2 h-15 rounded hover:bg-gray-800 ${
                    conversationId === converation._id
                      ? "bg-gray-800 font-bold"
                      : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={partner.user.profilePic} className="" />
                    <AvatarFallback className="text-gray-800">
                      {partner.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl">{partner.user.name}</p>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};
