import ITeams from './ITeams';

export default interface ITeamModel {
  getAllTeams(): Promise<ITeams[]>,
  getTeamById(id: number):Promise<ITeams | null>,
}
