import { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../lib/cloudinary";

const getAllDoctorsList = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().populate("user");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get list of all registered doctors",
    });
  }
};

const getCurrentLoggedInDoctor = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      message: "Unauthorised User",
    });
    return;
  }
  const doctor = await Doctor.findOne({
    user: user?._id,
  }).populate("user");
  if (!doctor) {
    console.log("Doctor not found w.r.t User");
    res.status(404).json({
      message: "User Not found",
    });
    return;
  }
  res.status(200).json(doctor);
};
const updateDoctorDetails = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user?._id;
    const doctor = await Doctor.findOne({ user: userId })
      .populate("user")
      .session(session);

    console.log("Req Body : ", req.body);
    if (!doctor) {
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

    const doctorFields = ["yearOfExperience", "expertise", "qualification"];
    for (const field of doctorFields) {
      if (req.body[field] !== undefined) {
        (doctor as any)[field] = req.body[field];
      }
    }

    await user?.save({ session });
    await doctor?.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Doctor details udpdated successfully",
      updatedUser: doctor,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating doctor details", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  getAllDoctorsList,
  updateDoctorDetails,
  getCurrentLoggedInDoctor,
};
