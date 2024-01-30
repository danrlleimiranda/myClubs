import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeams from '../Interfaces/ITeams';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel:TeamModel = new TeamModel()) {}
  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.getAllTeams();

    return { status: 'SUCCESSFUL', data: teams };
  }
}
