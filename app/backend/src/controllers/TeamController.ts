import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();

    return res.status(200).json(teams.data);
  }
}
