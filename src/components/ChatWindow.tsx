import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/auth/AuthContext";
import { Role, type Message } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const ChatWindow: React.FC = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: crypto.randomUUID(),
      senderId: currentUser!.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isDoctor = currentUser?.role === Role.DOCTOR;

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isDoctor ? "Chat with Patient" : "Chat with Doctor"}
      </h2>

      <Card className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg space-y-2">
        {messages.map((msg) => {
          const isOwn = msg.senderId === currentUser?.id;
          return (
            <div
              key={msg.id}
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
