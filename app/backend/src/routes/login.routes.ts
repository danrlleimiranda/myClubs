import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/loginMiddleware';

const loginRouter = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

loginRouter.post(
  '/',
  (req, res, next) => loginMiddleware.validateLogin(req, res, next),
  (req, res) => loginController.login(req, res),
);
export default loginRouter;
