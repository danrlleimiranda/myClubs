import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const query = inProgress ?? '';

    const serviceResponse = await this.matchService
      .getAllMatches(query.toString());

    return res.status(200).json(serviceResponse.data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.finishMatch(Number(id));

    const statusHttp = mapStatusHttp(serviceResponse.status);

    return res.status(statusHttp).json(serviceResponse.data);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matchService.updateMatch({ id: Number(id),
      homeTeamGoals,
      awayTeamGoals });

    const statusHttp = mapStatusHttp(serviceResponse.status);

    return res.status(statusHttp).json(serviceResponse.data);
  }
}
