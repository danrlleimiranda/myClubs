import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {

  }

  async getLeaderboardHome(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardHome();

    return res.status(200).json(serviceResponse.data);
  }

  async getLeaderboardAway(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboardAway();

    return res.status(200).json(serviceResponse.data);
  }

  async getLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();

    return res.status(200).json(serviceResponse.data);
  }
}
