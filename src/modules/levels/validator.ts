import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utilities/errorClasses';

export const levelValidator = (req: Request, res: Response, next: NextFunction): void => {
    const leveData = req.body;

    // Validate the request body
    if (!leveData.level || typeof leveData.level !== 'string') {
        throw new BadRequestError('Name is required and must be a string');
    }

    next();
}