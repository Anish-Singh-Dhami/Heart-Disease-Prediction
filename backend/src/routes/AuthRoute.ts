import express, { Request, Response } from "express";
import AuthController from "../controllers/AuthController";
import multer from "multer";
import { ProtectRouteMiddleWare } from "../middleware/ProtectRouteMiddleware";

const router = express.Router();
const upload = multer();

router.get("/", ProtectRouteMiddleWare, AuthController.getCurrentLoggedInUser);
router.post("/signup", upload.none(), AuthController.signupUser);
router.post("/login", upload.none(), AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);

export default { router };
