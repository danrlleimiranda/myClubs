import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import * as bcrypt from 'bcryptjs';
import SequelizeUser from '../database/models/UserModel';
import { LoginData } from '../Interfaces/ILogin';

export default class LoginMiddleware {
  private model = SequelizeUser;

  static validate({ email, password }: LoginData) {
    const filled = 'All fields must be filled';
    const loginSchema = Joi.object({
      email: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
        .required().messages({
          'any.required': filled,
          'string.empty': filled,
          'string.pattern.base': 'Email must be like example@example.com',
        }),
      password: Joi.string().min(6)
        .required().messages({ 'any.required': filled,
          'string.empty': filled }),
    });

    const { error } = loginSchema.validate({ email, password });

    return error;
  }

  async validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const error = LoginMiddleware.validate({ email, password });

    if (error) return res.status(400).json({ message: error.message });

    const user = await this.model.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid email or password' });

    next();
  }
}
