import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { generateJWT } from "../lib/utils";
import { Role, User } from "../models/user.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Patient } from "../models/patient.model";
import { Doctor } from "../models/doctor.model";

const TOKEN = process.env.TOKEN_NAME;
const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY;

const getCurrentLoggedInUser = async (req: Request, res: Response) => {
  const token = req.cookies[TOKEN!];
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
    res.status(200).json(user);
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signupUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    let user;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    if (user) {
      console.log("User Already exists...");
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await hashPassword(password);
    } catch (error) {
      console.error("Error hashing password:", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
      return;
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Create new user
      const newUser = await User.create(
        [
          {
            name: username,
            email: email,
            password: hashedPassword,
            role,
          },
        ],
        {
          session,
        }
      );

      const userId = newUser[0]._id;

      if (role === Role.PATIENT) {
        await Patient.create([{ user: userId }], { session });
      } else {
        await Doctor.create([{ user: userId }], { session });
      }

      await session.commitTransaction();
      session.endSession();
      // Generate JWT and set cookie
      generateJWT({ userId: newUser[0]._id.toString(), res });

      res.status(201).json({
        _id: newUser[0]._id,
        name: username,
        email,
        profilePic: newUser[0].profilePic,
      });
    } catch (error) {}
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const hashPassword = async (password: string): Promise<string> => {
  const SALT_ROUNDS = 10;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    console.log("Login Req: ", req.body);
    let user;
    try {
      user = await User.findOne({ email, role });
      if (!user) {
        res.status(401).json({ message: "Invalid credentials email" });
        return;
      }
    } catch (error) {
      console.error("Error querying the database:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    // Check password
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Invalid credentials");
        res.status(401).json({ message: "Invalid credentials password" });
        return;
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    // Generate JWT and set cookie
    generateJWT({ userId: user._id.toString(), res });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged Out" });
};

export default { loginUser, signupUser, getCurrentLoggedInUser, logoutUser };
