import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

type GenerateJWTParams = {
  userId: string; // The ID of the user for whom the JWT is being generated
  res: Response; // The Express response object to set the cookie on
};

const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRETE_KEY;
  if (!secretKey) {
    console.log("JWT secret key is not defined in environment variables");
    throw new Error("Internal Server error");
  }
  return jwt.sign({ userId }, secretKey, { expiresIn: "7d" });
};

const setTokenCookie = (res: Response, token: string): void => {
  const cookieName = process.env.TOKEN_NAME || "jwt";

  res.cookie(cookieName, token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie (helps mitigate XSS attacks)
    sameSite: "strict", // Helps to prevent CSRF attacks
    secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
    maxAge: COOKIE_MAX_AGE, // 7 days
  });
};

const generateJWT = ({ userId, res }: GenerateJWTParams): void => {
  try {
    const token = generateToken(userId);
    setTokenCookie(res, token);
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate JWT.");
  }
};

const getSortedUserIds = (
  user1_id: string,
  user2_id: string
): [string, string] => {
  return user1_id < user2_id ? [user1_id, user2_id] : [user2_id, user1_id];
};

export { generateToken, setTokenCookie, generateJWT, getSortedUserIds };
