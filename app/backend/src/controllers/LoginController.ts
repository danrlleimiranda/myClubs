import { Request, Response } from 'express';
import mapStatusHttp from '../utils/mapStatusHttp';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService = new LoginService()) {}

  async login(req: Request, res: Response) {
    const { email } = req.body;

    const serviceResponse = await this.loginService.login({ email });

    const statusHttp = mapStatusHttp(serviceResponse.status);

    return res.status(statusHttp).json(serviceResponse.data);
  }
}
