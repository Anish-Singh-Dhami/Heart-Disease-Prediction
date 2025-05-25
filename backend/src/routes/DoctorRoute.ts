import express from "express";
import DoctorController from "../controllers/DoctorController";
import { uploadMemory } from "../lib/multer";

const router = express.Router();

router.get("/", DoctorController.getCurrentLoggedInDoctor);
router.get("/all", DoctorController.getAllDoctorsList);
router.put(
  "/update",
  uploadMemory.single("profilePic"),
  DoctorController.updateDoctorDetails
);

export default { router };
