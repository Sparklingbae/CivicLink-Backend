import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utilities/errorClasses';
// import {Title} from './interfaces';
import Joi from 'joi';



export const createOfficialValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      title: Joi.string().required(),
      img_url: Joi.string().optional(),
      level: Joi.string().required(),
      ministry: Joi.string().optional(),
      jurisdiction: Joi.string().optional(),
      responsibility_area: Joi.string().max(500).required(),
      contact_info: Joi.object({
        email: Joi.string().email().optional(),
        phone_number: Joi.string().pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/).optional(),
        social_media: Joi.string().optional()
      }),
      location: Joi.object({
        state: Joi.string().optional(),
        localGovernment: Joi.string().optional(),
        address: Joi.string().optional()
      }),
      active_status: Joi.boolean().optional()
    });
  
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
    throw new BadRequestError(error.details.map(detail => detail.message).join(', '));
    }
  
    next();
  };

export const updateOfficialValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).optional(),
      title: Joi.string().optional(),
      img_url: Joi.string().optional(),
      level: Joi.string().required(),
      ministry: Joi.string().optional(),
      jurisdiction: Joi.string().optional(),
      responsibility_area: Joi.string().max(500).optional(),
      contact_info: Joi.object({
        email: Joi.string().email().optional(),
        phone_number: Joi.string().pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/).optional(),
        social_media: Joi.string().optional()
      }),
      location: Joi.object({
        state: Joi.string().optional(),
        localGovernment: Joi.string().optional(),
        address: Joi.string().optional()
      }),
      active_status: Joi.boolean().optional()
    });
  
    const { error } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
    throw new BadRequestError(error.details.map(detail => detail.message).join(', '));
    }
  
    next();
  };
