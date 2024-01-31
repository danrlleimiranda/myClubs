import * as jwt from 'jsonwebtoken';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeUser from '../database/models/UserModel';
import IUser from '../Interfaces/IUser';

type LoginToken = {
  token: string
};

export default class LoginService {
  private model = SequelizeUser;

  async login({ email }: { email: string }):Promise<ServiceResponse<LoginToken>> {
    const secret = process.env.JWT_SECRET ?? 'secret';
    const user = await this.model.findOne({
      where: { email },
    }) as IUser;

    const payload = {
      sub: user.id,
      role: user.role,
    };
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1d',
    };

    const token = jwt.sign(payload, secret, jwtConfig);
    return { status: 'succesful', data: { token } };
  }
}
