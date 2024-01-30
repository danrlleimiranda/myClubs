import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeams from '../Interfaces/ITeams';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel:TeamModel = new TeamModel()) {}
  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.getAllTeams();

    return { status: 'succesful', data: teams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamModel.getTeamById(id);

    if (!team) return { status: 'notFound', data: { message: 'Team not found' } };

    return { status: 'succesful', data: team };
  }
}
