import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', (req, res) => leaderboardController.getLeaderboardHome(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getLeaderboardAway(req, res));

export default leaderboardRouter;
