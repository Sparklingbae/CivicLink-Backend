import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utilities/errorClasses';
import {Title} from './interfaces';
import Joi from 'joi';



export const createOfficialValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      title: Joi.string().valid(...Object.values(Title)).required(),
      level: Joi.string().required(),
      ministry: Joi.string().optional(),
      responsibility_area: Joi.string().max(500).required(),
      contact_info: Joi.object({
        email: Joi.string().email().required(),
        phone_number: Joi.string().pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/).required()
      }),
      location: Joi.object({
        state: Joi.string().required(),
        localGovernment: Joi.string().optional()
      }),
      active_status: Joi.boolean().optional()
    });
  
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
    throw new BadRequestError(error.details.map(detail => detail.message).join(', '));
    }
  
    next();
  };
