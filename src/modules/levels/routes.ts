import express from "express";
import {createLevel,getLevel,getLevels,updateLevel,deleteLevel} from "./controller"
import { authMiddleware } from "../auth/middleware";
import {levelValidator}  from "./validator";

const router = express.Router();

router.post("/levels",authMiddleware, levelValidator,createLevel);
router.get("/levels/:id", getLevel);
router.get("/levels", getLevels);
router.put("/levels/:id", authMiddleware, levelValidator, updateLevel);
router.delete("/levels/:id", authMiddleware, deleteLevel);  


export default router;