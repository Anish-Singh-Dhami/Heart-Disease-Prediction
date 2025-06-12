import { type Conversation, type Message } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_CONVERSATION_URL = import.meta.env.VITE_API_CONVERSATION_URL;

const useGetConversationId = () => {
  type ConversationRequestType = {
    patientId: string;
    doctorId: string;
  };
  const getConversationId = async ({
    patientId,
    doctorId,
  }: ConversationRequestType): Promise<Conversation> => {
    const res = await fetch(`${API_BASE_URL}/${API_CONVERSATION_URL}/start`, {
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
    const res = await fetch(`${API_BASE_URL}/${API_CONVERSATION_URL}`, {
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
      `${API_BASE_URL}/${API_CONVERSATION_URL}/${conversationId}/message`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!res.ok) {
      const errRes = await res.json();
      throw new Error(errRes.message || "Error while loading old messages...");
    }
    return res.json();
  };
  return useQuery({
    queryKey: ["getChatReq", conversationId],
    queryFn: getChatReq,
  });
};

type Payload = {
  message: string;
  sendBy: string;
};

type PostMessageType = {
  conversationId: string;
  payload: Payload;
};

const usePostMessage = () => {
  const postChatMessage = async ({
    conversationId,
    payload,
  }: PostMessageType): Promise<Message> => {
    const res = await fetch(
      `${API_BASE_URL}/${API_CONVERSATION_URL}/${conversationId}/message`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Error while sending message");
    }
    return res.json();
  };

  return useMutation({
    mutationFn: postChatMessage,
  });
};

export {
  useGetConversationUser,
  useGetConversationId,
  useGetChats,
  usePostMessage,
};
