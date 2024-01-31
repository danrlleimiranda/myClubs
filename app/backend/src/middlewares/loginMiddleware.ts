import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

export default class loginMiddleware {
  static async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const loginSchema = Joi.object({
      email: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
        .required().messages({
          'string.required': 'All fields must be filled',
        }),
      password: Joi.string().min(6).required(),
    });

    const { error } = loginSchema.validate({ email, password });

    if (error) return res.status(400).json({ message: error.message });

    next();
  }
}
