import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./utils";
import UserModel from "./model";
import { IUser } from "./interfaces";

// Extend Express Request to include user, AI suggestion
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Access token is required" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    // Find user by id from token
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
