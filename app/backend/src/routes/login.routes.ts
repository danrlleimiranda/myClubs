import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const loginRouter = Router();

const loginController = new LoginController();
const authMiddleware = new AuthMiddleware();

loginRouter.post(
  '/',
  (req, res) => loginController.login(req, res),
);

loginRouter.get(
  '/role',
  (req, res, next) => authMiddleware.auth(req, res, next),
  LoginController.getRole,
);
export default loginRouter;
