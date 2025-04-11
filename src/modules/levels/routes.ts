import express from "express";
import {createLevel, getLevel, getLevels, updateLevel, deleteLevel} from "./controller"
import { authMiddleware } from "../user/middleware";
import {levelValidator} from "./validator";

const router = express.Router();

// Remove the redundant "/levels" prefix from all routes
router.post("/levels", authMiddleware, levelValidator, createLevel);
router.get("/levels", getLevels);  // Get all levels route should come before parameterized routes
router.get("levels/:id", getLevel);
router.put("levels/:id", authMiddleware, levelValidator, updateLevel);
router.delete("levels/:id", authMiddleware, deleteLevel);  

export default router;