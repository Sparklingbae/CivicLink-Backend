import express from "express";
import { login } from "./controller";
import { loginValidator } from "./validator";

const router = express.Router();

router.post("/login", loginValidator ,login);

export default router;