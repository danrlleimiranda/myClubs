import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const matchRouter = Router();
const matchController = new MatchController();
const authMiddleware = new AuthMiddleware();

matchRouter.get('/', (req, res) => matchController.getAllMatches(req, res));

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
