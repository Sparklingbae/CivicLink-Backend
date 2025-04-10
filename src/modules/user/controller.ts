import { Request, Response } from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
} from "./services";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};


export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = req.user._id.toString();
    const result = await updateUser(userId, req.body);
    res.status(200).json({ user: result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    const result = await getAllUsers();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
