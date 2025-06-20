// pages/ChatPage.tsx
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import socket from "@/lib/socket";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { conversationId } = useParams();
  useEffect(() => {
    if (conversationId) {
      socket.emit("join_conversation", conversationId);
    }
    return () => {
      socket.off("join_conversation");
    };
  }, [conversationId]);
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1 bg-gray-950 text-white">
        {conversationId ? (
          <ChatWindow conversationId={conversationId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
