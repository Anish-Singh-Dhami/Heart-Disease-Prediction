import express from "express";
import ConversationController from "../controllers/ConversationController";

const router = express.Router();

router.get("/", ConversationController.getUserConversations);
router.get(
  "/:conversationId/messages",
  ConversationController.getConversationMessages
);
router.post("/start", ConversationController.startConversation);
router.post("/:conversationId/messages", ConversationController.sendMessage);

export default { router };
