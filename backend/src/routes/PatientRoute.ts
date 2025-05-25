import express from "express";
import PatientController from "../controllers/PatientController";
import { uploadMemory } from "../lib/multer";

const router = express.Router();

router.get("/", PatientController.getCurrentLoggedInPatient);
router.put(
  "/update",
  uploadMemory.single("profilePic"),
  PatientController.updatePatientDetails
);

export default { router };
