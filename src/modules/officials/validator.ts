import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utilities/errorClasses';


import Joi from 'joi';
import { OfficialRequest } from './interfaces';
import { Types } from 'mongoose';


export const createOfficialValidator = (
    req: Request,
    res: Response,
    next: NextFunction
    ): void => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        }),
        title: Joi.string().required().messages({
        'string.empty': 'Title is required',
        }),
        level: Joi.string()
        .custom((value, helpers) => {
            if (!Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
            }
            return value;
        })
        .required()
        .messages({
            'any.invalid': 'Invalid level ID',
            'string.empty': 'Level ID is required',
        }),
    });
    
    const { error } = schema.validate(req.body);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }
    
    next();
    };
