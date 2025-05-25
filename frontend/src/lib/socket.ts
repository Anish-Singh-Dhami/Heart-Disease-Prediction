import { io, type Socket } from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true,
});

export default socket;
