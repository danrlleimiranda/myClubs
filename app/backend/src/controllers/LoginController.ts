import { Request, Response } from 'express';
import mapStatusHttp from '../utils/mapStatusHttp';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.loginService.login({ email, password });

    const statusHttp = mapStatusHttp(serviceResponse.status);

    return res.status(statusHttp).json(serviceResponse.data);
  }

  static async getRole(_req: Request, res: Response) {
    const { user } = res.locals;
    const { role } = user;

    return res.status(200).json({ role });
  }
}
