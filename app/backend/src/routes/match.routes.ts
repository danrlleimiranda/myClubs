import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import ValidateMatchMiddleware from '../middlewares/ValidateMatchMiddleware';

const matchRouter = Router();
const matchController = new MatchController();
const authMiddleware = new AuthMiddleware();
const validateMatchMiddleware = new ValidateMatchMiddleware();

matchRouter.get('/', (req, res) => matchController.getAllMatches(req, res));
matchRouter.post(
  '/',
  (req, res, next) => authMiddleware.auth(req, res, next),
  (req, res, next) => validateMatchMiddleware.validateMatch(req, res, next),
  (req, res) => matchController.createMatch(req, res),
);

matchRouter.patch(
  '/:id',
  (req, res, next) => authMiddleware.auth(req, res, next),
  (req, res) => matchController.updateMatch(req, res),
);

matchRouter.patch(
  '/:id/finish',
  (req, res, next) => authMiddleware.auth(req, res, next),
  (req, res) => matchController.finishMatch(req, res),
);

export default matchRouter;
