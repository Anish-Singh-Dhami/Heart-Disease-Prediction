import { useState, useRef, useEffect } from "react";
import { Role, type Message } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/api/AuthApi";
import { useGetChats, usePostMessage } from "@/api/ChatApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import socket from "@/lib/socket";

type ChatWindowProp = {
  conversationId: string;
};

export const ChatWindow: React.FC<ChatWindowProp> = ({ conversationId }) => {
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   console.log("Chat Window rendered!!");
  //   if (conversationId) {
  //     queryClient.invalidateQueries({
  //       queryKey: ["getConverationUserReq"],
  //     });
  //     if (data) setMessages(data);
  //     socket.emit("join_conversation", conversationId);
  //   }
  //   return () => {
  //     socket.off("disconnect");
  //   };
  // }, [conversationId]);
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, error } = useGetChats({ conversationId });

  // Join conversation room on mount
  // const queryClient = useQueryClient();
  // useEffect(() => {
  //   if (conversationId) {
  //     queryClient.invalidateQueries({
  //       queryKey: ["getConverationUserReq"],
  //     });
  //     if(data)
  //       setMessages(data);
  //     socket.emit("join_conversation", conversationId);
  //   }
  //   return () => {
  //     socket.off("disconnect");
  //   };
  // }, [conversationId]);

  useEffect(() => {
    if (!isLoading && data) setMessages(data!);
  }, [data]);

  const navigate = useNavigate();
  if (error) {
    toast.error(error.message);
    navigate(`/${currentUser?.role}/chat`);
  }

  // Listen for new real-time messages
  useEffect(() => {
    socket.on("receive_message", (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessageMutation = usePostMessage();

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const payload = {
      message: newMessage,
      sendBy: currentUser?.role!,
    };
    sendMessageMutation.mutate(
      {
        conversationId,
        payload,
      },
      {
        onSuccess: () => {
          setNewMessage("");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {data ? (
        <div className="flex flex-col h-full overflow-hidden mx-auto bg-gray-900 text-white p-4 rounded-lg shadow-lg">
          <Card className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded-lg space-y-2">
            {messages.map((msg) => {
              if (msg.conversation !== conversationId) return null;
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
            <Button
              onClick={handleSend}
              className="bg-gray-700 hover:bg-gray-900  border-2 border-gray-700"
            >
              Send
            </Button>
          </div>
        </div>
      ) : (
        <h1> Loading ..</h1>
      )}
    </>
  );
};
