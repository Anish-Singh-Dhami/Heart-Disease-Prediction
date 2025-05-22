import { useState, useRef, useEffect } from "react";
import { Role, type Conversation, type Message } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockMessages } from "@/mockData";
import { useAuth } from "@/api/AuthApi";
import { useGetChats } from "@/api/ChatApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ChatWindowProp = {
  conversationId: string;
};

export const ChatWindow: React.FC<ChatWindowProp> = ({ conversationId }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetChats({ conversationId });
  if (!isLoading && data) {
    console.log("Messages received :", data);
    setMessages(data);
  }
  const navigate = useNavigate();
  if (error) {
    toast.error(error.message);
    navigate(`/${currentUser?.role}/chat`);
  }
  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      _id: crypto.randomUUID(),
      conversation: "conv-1",
      isSendByDoctor: currentUser?.role === Role.DOCTOR,
      content: newMessage.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };
  console.log("Rendering ChatWindow, conversationId: ", conversationId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full overflow-hidden mx-auto bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <Card className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg space-y-2">
        {messages.map((msg) => {
          if ((msg.conversation as Conversation)._id !== conversationId)
            return null;
          const isOwn = msg.isSendByDoctor
            ? currentUser?.role === Role.DOCTOR
            : currentUser?.role === Role.PATIENT;
          return (
            <div
              key={msg._id}
              className={`flex ${
                isOwn ? "justify-end" : "justify-start"
              } text-sm`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  isOwn ? "bg-blue-500 text-white" : "bg-gray-600"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </Card>

      <div className="flex mt-4 space-x-2">
        <Input
          className="flex-1 bg-gray-700 text-white border-none focus-visible:ring-1 focus-visible:ring-white"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};
