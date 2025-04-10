import jwt from "jsonwebtoken";
import { IUser } from "./interfaces";

// You should store this in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "civilink-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN? parseInt(process.env.JWT_EXPIRES_IN): 24*60;

export interface IJwtPayload {
  id: string;
  role: string;
}

export const generateToken = (payload: IJwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN*60 });
};

export const verifyToken = (token: string): IJwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as IJwtPayload;
  } catch (error) {
    return null;
  }
};
