import { model, Schema, Types } from "mongoose";

interface IDoctor {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  yearOfExperience?: number;
  expertise?: string;
  qualification?: string;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    yearOfExperience: {
      type: Number,
    },
    expertise: {
      type: String,
    },
    qualification: {
      type: String,
    },
  },
  { timestamps: true }
);

const Doctor = model<IDoctor>("Doctor", DoctorSchema);

export { Doctor, IDoctor };
