import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const TOKEN_NAME = process.env.TOKEN_NAME;
const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY;
const ProtectRouteMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!TOKEN_NAME) {
    console.log("TOKEN_NAME env not defined");
    res.status(500).json({
      message: "Internal Server Error",
    });
    return;
  }
  const token = req.cookies[TOKEN_NAME];
  if (!token) {
    console.log(token);
    res.status(401).json({
      message: "Unauthorised User",
    });
    return;
  }
  try {
    if (!JWT_SECRETE_KEY) {
      console.log("JWT secret key is not defined in environment variables.");
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    const payload = jwt.verify(token, JWT_SECRETE_KEY) as { userId: string };
    const user = await User.findById(payload.userId);
    if (!user) {
      console.log("User Not found for the cookie");
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { ProtectRouteMiddleWare };
