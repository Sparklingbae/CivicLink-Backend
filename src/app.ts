// File: src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './config/cors';
import { loggerMiddleware } from './middleware';
import { errorHandler } from './utilities/errorMiddleware';
import { NotFoundError } from './utilities/errorClasses';
import levelsRouter from './modules/levels/routes';
import officialsRouter from './modules/officials/routes';
import userRouter from './modules/user/routes';
import authRouter from './modules/auth/route';

const app: Application = express();

// Security Middleware
app.use(helmet());

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use(cors(corsOptions));

// Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'API is running' });
});

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/levels", levelsRouter);
app.use("/api/officials", officialsRouter);


// // Handle undefined routes
app.all('*"catch_all"', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});
  

// Global error handler
app.use(errorHandler);

// Logging Middleware
app.use(loggerMiddleware);

export default app;
