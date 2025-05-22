import express from "express";
import PatientController from "../controllers/PatientController";
import { ProtectRouteMiddleWare } from "../middleware/ProtectRouteMiddleware";

const router = express.Router();

router.get(
  "/",
  ProtectRouteMiddleWare,
  PatientController.getCurrentLoggedInPatient
);
router.post(
  "/update",
  ProtectRouteMiddleWare,
  PatientController.updatePatientDetails
);

export default { router };
