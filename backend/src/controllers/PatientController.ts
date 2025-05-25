import { Request, Response } from "express";
import { Patient } from "../models/patient.model";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../lib/cloudinary";

const getCurrentLoggedInPatient = async (req: Request, res: Response) => {
  const user = req.user;
  console.log("Triggered GET:/api/patient route");
  if (!user) {
    res.status(401).json({
      message: "Unauthorised User",
    });
    return;
  }
  const patient = await Patient.findOne({
    user: user?._id,
  }).populate("user");
  if (!patient) {
    console.log("Patient not found w.r.t User");
    res.status(404).json({
      message: "User Not found",
    });
    return;
  }
  res.status(200).json(patient);
};

const updatePatientDetails = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user?._id;
    const patient = await Patient.findOne({ user: userId })
      .populate("user")
      .session(session);

    console.log("Req Body : ", req.body);
    if (!patient) {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json({ message: "User not found" });
      return;
    }
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json({
        message: "User Not Found",
      });
      return;
    }

    const userFields = ["name", "age", "gender", "country", "state"];
    for (const field of userFields) {
      if (req.body[field] !== undefined) {
        (user as any)[field] = req.body[field];
      }
    }
    if (req.file) {
      const uploadedFile = await uploadToCloudinary(req.file);
      user.profilePic = uploadedFile.url;
    }

    await user?.save({ session });
    await patient?.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "patient details udpdated successfully",
      updatedUser: patient,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating patient details", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default { getCurrentLoggedInPatient, updatePatientDetails };
