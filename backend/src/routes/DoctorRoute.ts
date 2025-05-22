import express from "express";
import DoctorController from "../controllers/DoctorController";
import { ProtectRouteMiddleWare } from "../middleware/ProtectRouteMiddleware";

const router = express.Router();

router.get("/", DoctorController.getCurrentLoggedInDoctor);
router.get("/all", DoctorController.getAllDoctorsList);

export default { router };
