import SequelizeTeam from '../database/models/TeamModel';
import ITeams from '../Interfaces/ITeams';
import ITeamModel from '../Interfaces/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async getAllTeams(): Promise<ITeams[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async getTeamById(id: number): Promise<ITeams | null> {
    const team = await this.model.findOne({
      where: { id },
    });

    return team;
  }
}
