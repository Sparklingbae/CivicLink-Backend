import { Router } from "express";
import { login } from "./controller";
import { loginValidator } from "./validator";

const authRouter = Router();

authRouter.post("/login", loginValidator ,login);

export default authRouter;