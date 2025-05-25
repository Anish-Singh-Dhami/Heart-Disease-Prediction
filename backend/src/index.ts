import express, { Request, RequestHandler, Response } from "express";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute";
import ConversationRoute from "./routes/ConversationRoute";
import DoctorRoute from "./routes/DoctorRoute";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import PatientRoute from "./routes/PatientRoute";
import { ProtectRouteMiddleWare } from "./middleware/ProtectRouteMiddleware";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const connectionString = process.env.MONGODB_CONNECTION_STRING!;
const REQUEST_ORIGIN = process.env.REQUEST_ORIGIN || `http://localhost:5173`;

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: REQUEST_ORIGIN,
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: REQUEST_ORIGIN, credentials: true }));
app.use(cookieParser());

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_conversation", (conversationId: string) => {
    socket.join(conversationId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Exposing socket instance to controllers
app.set("socketio", io);

// Routes
app.use("/api/auth", AuthRoute.router);
app.use("/api/conversation", ProtectRouteMiddleWare, ConversationRoute.router);
app.use("/api/doctor", ProtectRouteMiddleWare, DoctorRoute.router);
app.use("/api/patient", ProtectRouteMiddleWare, PatientRoute.router);

const connectToDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to DB successfully.");
  } catch (error) {
    console.error("Failed to connect to the DB ", error);
  }
};

connectToDB();

server.listen(PORT, () => {
  console.log(`Server is running http//localhost:${PORT}`);
});
