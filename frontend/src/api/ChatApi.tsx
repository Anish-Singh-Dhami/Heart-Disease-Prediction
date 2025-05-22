import {
  Role,
  type Conversation,
  type Doctor,
  type Message,
  type Patient,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./AuthApi";

// export type ChatPartner = {
//   _id: string;
//   name: string;
//   profilePic?: string;
//   unreadMessage: number;
// };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const useChatPartners = () => {
//   const getAllChatPatner = async (): Promise<ChatPartner[]> => {
//     const response = await fetch(`${API_BASE_URL}/api/chats/users`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch chat patners");
//     }
//     return response.json();
//   };

//   return useQuery({
//     queryKey: ["chat-patners"],
//     queryFn: getAllChatPatner,
//   });
// };

const useGetConversationId = () => {
  type ConversationRequestType = {
    patientId: string;
    doctorId: string;
  };
  const getConversationId = async ({
    patientId,
    doctorId,
  }: ConversationRequestType): Promise<Conversation> => {
    const res = await fetch(`${API_BASE_URL}/api/conversation/start`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patientId, doctorId }),
    });
    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(errRes.message || "Something went wrong.");
    }
    return res.json();
  };
  return useMutation({
    mutationFn: getConversationId,
  });
};

const useGetConversationUser = () => {
  const getConverationUserReq = async (): Promise<Conversation[]> => {
    const res = await fetch(`${API_BASE_URL}/api/conversation`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(
        errRes.message || "Failed to get other users with whom you chat"
      );
    }
    return res.json();
  };
  return useQuery({
    queryKey: ["getConverationUserReq"],
    queryFn: getConverationUserReq,
  });
};

type UseGetChatsProp = {
  conversationId: string;
};

const useGetChats = ({ conversationId }: UseGetChatsProp) => {
  const getChatReq = async (): Promise<Message[]> => {
    const res = await fetch(
      `${API_BASE_URL}/api/converation/:${conversationId}/message`
    );
    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(errRes.message || "Error while loading old messages...");
    }
    return res.json();
  };
  return useQuery({
    queryKey: ["getChatReq"],
    queryFn: getChatReq,
  });
};

export { useGetConversationUser, useGetConversationId, useGetChats };
