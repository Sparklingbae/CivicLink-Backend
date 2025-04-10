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
