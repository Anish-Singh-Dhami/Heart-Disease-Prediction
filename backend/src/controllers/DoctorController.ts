import { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";

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
const updateDoctorDetails = async (req: Request, res: Response) => {};

export default {
  getAllDoctorsList,
  updateDoctorDetails,
  getCurrentLoggedInDoctor,
};
