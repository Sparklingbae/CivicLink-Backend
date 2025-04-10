// File: src/app.ts
import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { corsOptions } from './config/cors';
import { loggerMiddleware } from './middleware';
import userRouter from './modules/user/routes';
import authRouter from './modules/auth/route';

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(loggerMiddleware);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

export default app;
