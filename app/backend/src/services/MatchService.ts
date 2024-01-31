import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeMatch from '../database/models/MatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  async getAllMatches(queryParams: string | undefined): Promise<ServiceResponse<SequelizeMatch[]>> {
    const matches = await this.matchModel.findAll(queryParams);

    return { status: 'succesful', data: matches };
  }
}
