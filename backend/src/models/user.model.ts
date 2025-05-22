import { model, Schema, Types } from "mongoose";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

enum Role {
  PATIENT = "patient",
  DOCTOR = "doctor",
}

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  age?: number;
  gender?: Gender;
  country?: string;
  state?: string;
  role: Role;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: Object.values(Gender),
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  transform: (doc, res) => {
    delete res.password;
    return res;
  },
});

const User = model<IUser>("User", UserSchema);

export { User, IUser, Gender, Role };
