import express, { Request, Response } from "express";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute";
import ConversationRoute from "./routes/ConversationRoute";
import DoctorRoute from "./routes/DoctorRoute";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import PatientRoute from "./routes/PatientRoute";
import { ProtectRouteMiddleWare } from "./middleware/ProtectRouteMiddleware";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const connectionString = process.env.MONGODB_CONNECTION_STRING!;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/api/auth", AuthRoute.router);
app.use("/api/conversation", ProtectRouteMiddleWare, ConversationRoute.router);
app.use("/api/doctor", ProtectRouteMiddleWare, DoctorRoute.router);
app.use("/api/patient", PatientRoute.router);

const connectToDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to DB successfully.");
  } catch (error) {
    console.error("Failed to connect to the DB ", error);
  }
};

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
