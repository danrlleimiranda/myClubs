import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const query = inProgress ?? '';

    const serviceResponse = await this.matchService
      .getAllMatches(query.toString());

    return res.status(200).json(serviceResponse.data);
  }
}
