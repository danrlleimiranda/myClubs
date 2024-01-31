import SequelizeMatch from '../database/models/MatchModel';

export default interface IMatchModel{
  findAll(queryParams: string | undefined):Promise<SequelizeMatch[]>
}
