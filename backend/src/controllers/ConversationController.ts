import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";
import { Role, User } from "../models/user.model";
import { Patient } from "../models/patient.model";
import { Doctor } from "../models/doctor.model";
import { IMessage, Message } from "../models/message.model";
import { send } from "process";

// Get all conversations for logged-in user
const getUserConversations = async (req: Request, res: Response) => {
  try {
    const user = req.user?._id;
    const role = req.user?.role;
    const filter =
      role === Role.PATIENT
        ? { patient: (await Patient.findOne({ user }))?._id }
        : { doctor: (await Doctor.findOne({ user }))?._id };
    const conversations = await Conversation.find(filter)
      .populate({
        path: Role.PATIENT,
        populate: {
          path: "user",
          model: "User",
        },
      })
      .populate({
        path: Role.DOCTOR,
        populate: {
          path: "user",
          model: "User",
        },
      });
    res.status(200).json(conversations);
  } catch (error) {
    console.log(
      "failed to fetch other user's with whom you converse : ",
      error
    );
    res.status(500).json({
      message: "Failed to get other user's with whom you converse",
    });
  }
};

// Start a new conversation or return existing
const startConversation = async (req: Request, res: Response) => {
  try {
    console.log("POST:/api/conversation/start, req body: ", req.body);
    const { patientId, doctorId } = req.body;
    if (!patientId || !doctorId) {
      res.status(400).json({
        error: "Both patientId and doctorId are required",
      });
      return;
    }

    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      res.status(400).json({
        error: "Invalid patient or doctor id",
      });
      return;
    }

    let conversation = await Conversation.findOne({
      patient: patientId,
      doctor: doctorId,
    });
    if (!conversation) {
      conversation = await Conversation.create({
        patient: patientId,
        doctor: doctorId,
      });

      const io = req.app.get("socketio");
      io.emit("new_conversation", conversation);
    }
    res.status(200).json(conversation);
  } catch (error) {
    console.error("startConversation error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const CONVERSATION_ID = process.env.CONVERSATION_ID || "conversationId";
// Get messages in a conversation
const getConversationMessages = async (req: Request, res: Response) => {
  try {
    console.log("Triggered getConversationMessages");
    const conversationId = req.params[CONVERSATION_ID];
    console.log("conversationId: ", conversationId);
    const messages: IMessage[] = await Message.find({
      conversation: conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getConversationMessages route :", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Send a message
const sendMessage = async (req: Request, res: Response) => {
  try {
    console.log("Req Body: ", req.body);
    const { message, sendBy } = req.body;
    const conversationId = req.params[CONVERSATION_ID];

    const messageObj = await Message.create({
      conversation: conversationId,
      content: message,
      isSendByDoctor: sendBy === Role.DOCTOR,
    });

    const io = req.app.get("socketio");
    io.to(conversationId).emit("receive_message", messageObj);

    res.status(201).json(messageObj);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getUserConversations,
  startConversation,
  getConversationMessages,
  sendMessage,
};
