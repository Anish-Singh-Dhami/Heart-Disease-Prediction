import express, { Request, Response } from "express";
import ConversationController from "../controllers/ConversationController";

const router = express.Router();


router.get("/", ConversationController.getUserConversations);
router.get(
  "/:conversationId/message",
  ConversationController.getConversationMessages
);
router.post("/start", ConversationController.startConversation);
router.post("/:conversationId/message", ConversationController.sendMessage);

export default { router };