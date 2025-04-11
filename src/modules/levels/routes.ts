import express from "express";
import {createLevel, getLevel, getLevels, updateLevel, deleteLevel} from "./controller"
import { authMiddleware } from "../user/middleware";
import {levelValidator} from "./validator";

const router = express.Router();

// Remove the redundant "/levels" prefix from all routes
router.post("/", authMiddleware, levelValidator, createLevel);
router.get("/", getLevels);  // Get all levels route should come before parameterized routes
router.get("/:id", getLevel);
router.put("/:id", authMiddleware, levelValidator, updateLevel);
router.delete("/:id", authMiddleware, deleteLevel);  

export default router;