import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from './errorClasses';

// Generic validation middleware
export function validateRequest<T>(validator: (data: any) => { valid: boolean; errors: string[] }) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { valid, errors } = validator(req.body);
    
    if (!valid) {
      return next(new BadRequestError(`Validation error: ${errors.join(', ')}`));
    }
    
    next();
  };
}