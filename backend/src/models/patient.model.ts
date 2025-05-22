import { model, Schema, Types } from "mongoose";

interface IPatient {
  _id: Types.ObjectId;
  user: Types.ObjectId;
}

const PatientSchema = new Schema<IPatient>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Patient = model<IPatient>("Patient", PatientSchema);

export { Patient, IPatient };
