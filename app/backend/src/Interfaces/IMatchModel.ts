import SequelizeMatch from '../database/models/MatchModel';

export type UpdateType = {
  id: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
};

export type CreateType = {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export default interface IMatchModel{
  findAll(queryParams: string | undefined):Promise<SequelizeMatch[]>
  finishMatch(id: number): Promise<number>
  findMatch(id: number): Promise<SequelizeMatch | null>
  update({ id, awayTeamGoals, homeTeamGoals }: UpdateType): Promise<number>
}
