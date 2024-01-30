import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHttp from '../utils/mapStatusHttp';

export default class TeamController {
  constructor(private teamService: TeamService = new TeamService()) {}

  async getAllTeams(_req: Request, res: Response) {
    const teams = await this.teamService.getAllTeams();

    return res.status(200).json(teams.data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(Number(id));
    const statusHttp = mapStatusHttp(team.status);
    return res.status(statusHttp).json(team.data);
  }
}
