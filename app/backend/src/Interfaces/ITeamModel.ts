import ITeams from './ITeams';

export default interface ITeamModel {
  getAllTeams(): Promise<ITeams[]>,

}
