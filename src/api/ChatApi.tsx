import { useQuery } from "@tanstack/react-query";

type ChatPartner = {
  _id: string;
  name: string;
  profilePic?: string;
  unreadMessage: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useChatPartners = () => {
  const getAllChatPatner = async (): Promise<ChatPartner[]> => {
    const response = await fetch(`${API_BASE_URL}/api/chats/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch chat patners");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["chat-patners"],
    queryFn: getAllChatPatner,
  });
};

export { useChatPartners };
