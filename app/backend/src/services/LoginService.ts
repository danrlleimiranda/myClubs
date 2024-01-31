import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as Joi from 'joi';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';
import SequelizeUser from '../database/models/UserModel';
import { LoginData } from '../Interfaces/ILogin';

type LoginToken = {
  token: string
};

export default class LoginService {
  private model = SequelizeUser;
  private _secret = process.env.JWT_SECRET ?? 'secret';
  private _invalidMessage = 'Invalid email or password';

  validateError(error: Joi.ValidationError): ServiceResponseError | undefined {
    if (error && error.message === this._invalidMessage) {
      return { status: 'unauthorized',
        data: { message: error.message } };
    }

    if (error && error.message !== this._invalidMessage) {
      return { status: 'badRequest',
        data: { message: error.message } };
    }
  }

  async validateLogin({ email, password }: LoginData) {
    const filled = 'All fields must be filled';
    const loginSchema = Joi.object({
      email: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)
        .required().messages({
          'any.required': filled,
          'string.empty': filled,
          'string.pattern.base':
          this._invalidMessage,
        }),
      password: Joi.string().min(6).required()
        .messages({ 'any.required': filled,
          'string.min': this._invalidMessage,
          'string.empty': filled }),
    });

    const { error } = loginSchema.validate({ email, password });
    if (error) return this.validateError(error);
  }

  async login({ email,
    password }: LoginData):Promise<ServiceResponse<LoginToken>> {
    const error = await this.validateLogin({ email, password });
    if (error) return { status: error.status, data: { message: error.data.message } };
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { status: 'unauthorized',
        data: { message: this._invalidMessage } };
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { status: 'unauthorized',
        data: { message: this._invalidMessage } };
    }
    const payload = { sub: user.id, role: user.role,
    };
    const jwtConfig: jwt.SignOptions = { expiresIn: '1d' };

    const token = jwt.sign(payload, this._secret, jwtConfig);
    return { status: 'succesful', data: { token } };
  }
}
