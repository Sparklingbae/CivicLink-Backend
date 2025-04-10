import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorClasses';

export const errorHandler: (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => void = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // For unexpected errors
  console.error('ERROR: ', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};