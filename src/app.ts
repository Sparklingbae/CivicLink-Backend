/// File: src/app.ts
import express from 'express';
import { json } from 'body-parser';
import { loggerMiddleware } from './middleware';
import authRouter from './modules/auth/routes';'./modeules/auth/routes';

const app = express();

app.use(json());
app.use(loggerMiddleware);
app.use("/api/auth", authRouter);

// Register routes here (e.g. /api/customers)
export default app;
