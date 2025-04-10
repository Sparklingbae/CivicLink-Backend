import express from "express";
import {
  registerUser,
  login,
  getCurrentUser,
  updateCurrentUser,
  getUsers,
} from "./controller";
import {
  loginValidator,
  updateUserValidator,
  registerUserValidator,
} from "./validator";
import { authMiddleware } from "./middleware";

const router = express.Router();

router.post("/register", registerUserValidator, registerUser);
router.post("/login", loginValidator, login);
router.get("/me", authMiddleware, getCurrentUser);
router.put("/me", authMiddleware, updateUserValidator, updateCurrentUser);

// Admin-only route
router.get("/users", authMiddleware, getUsers);

export default router;
