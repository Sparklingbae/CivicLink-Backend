import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
    return;
  }
  next();
};

export const updateUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    email: Joi.string().email().optional().messages({
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().min(6).optional().messages({
      "string.min": "Password must be at least 6 characters long",
    }),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    location: Joi.string().optional(),
    role: Joi.string().valid("user", "admin").optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
    return;
  }

  next();
};

export const registerUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    }),
    role: Joi.string().valid("user", "admin").optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: "Validation error",
      details: error.details.map((d) => d.message),
    });
    return;
  }

  next();
};
