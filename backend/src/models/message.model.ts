import { model, Schema, Types } from "mongoose";

interface IMessage {
  _id: Types.ObjectId;
  isSendByDoctor: Boolean;
  conversation: Types.ObjectId;
  content: String;
}

const MessageSchema = new Schema<IMessage>(
  {
    isSendByDoctor: {
      type: Boolean,
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model<IMessage>("Message", MessageSchema);

export { Message, IMessage };
