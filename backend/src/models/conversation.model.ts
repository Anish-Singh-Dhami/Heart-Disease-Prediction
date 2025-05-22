import { model, Schema, Types } from "mongoose";

interface IConversation {
  _id: Types.ObjectId;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
}

const ConversationSchema = new Schema<IConversation>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  { timestamps: true }
);

const Conversation = model<IConversation>("Conversation", ConversationSchema);

export { Conversation, IConversation };
