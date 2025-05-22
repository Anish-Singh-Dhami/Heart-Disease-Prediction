import { Request, Response } from "express";
import { Patient } from "../models/patient.model";

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

const updatePatientDetails = async (req: Request, res: Response) => {};

export default { getCurrentLoggedInPatient, updatePatientDetails };
