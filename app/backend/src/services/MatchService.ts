import { ServiceResponse } from '../Interfaces/ServiceResponse';
import SequelizeMatch from '../database/models/MatchModel';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  async getAllMatches(queryParams: string | undefined): Promise<ServiceResponse<SequelizeMatch[]>> {
    const matches = await this.matchModel.findAll(queryParams);

    return { status: 'succesful', data: matches };
  }

  async finishMatch(id: number) {
    const match = await this.matchModel.findMatch(id);

    if (!match) return { status: 'notFound', data: { message: 'Match not found' } };

    await this.matchModel.finishMatch(id);

    return { status: 'succesful', data: { message: 'Finished' } };
  }

  async updateMatch({ id, homeTeamGoals, awayTeamGoals }: { id: number,
    homeTeamGoals: number, awayTeamGoals: number }) {
    const match = this.matchModel.findMatch(id);

    if (!match) return { status: 'notFound', data: { message: 'Match not found' } };

    const updated = await this.matchModel.update({ id, homeTeamGoals, awayTeamGoals });

    if (updated !== 0) return { status: 'succesful', data: { message: 'Updated' } };

    return { status: 'badRequest', data: { message: 'Something went wrong' } };
  }
}
