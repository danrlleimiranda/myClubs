import IMatchModel, { CreateType, UpdateType } from '../Interfaces/IMatchModel';
import SequelizeMatch from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/TeamModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(queryParams: string | undefined): Promise<SequelizeMatch[]> {
    if (queryParams === 'true' || queryParams === 'false') {
      const matchesInProgressOrNot = await this.model.findAll({
        where: { inProgress: queryParams === 'true' },
        include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
          { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] }],
      });

      return matchesInProgressOrNot;
    }

    const matches = await this.model.findAll({
      include: [{ model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] }],
    });

    return matches;
  }

  async findMatch(id: number): Promise<SequelizeMatch | null> {
    const match = await this.model.findOne({
      where: { id },
    });

    return match;
  }

  async finishMatch(id: number): Promise<number> {
    const [finished] = await this.model.update({ inProgress: false }, {
      where: { id },
    });

    return finished;
  }

  async update({ id, awayTeamGoals, homeTeamGoals }: UpdateType): Promise<number> {
    const [affectedRows] = await this.model.update({ awayTeamGoals, homeTeamGoals }, {
      where: { id },
    });

    return affectedRows;
  }

  async create({ homeTeamId, awayTeamId,
    homeTeamGoals, awayTeamGoals }: CreateType): Promise<SequelizeMatch> {
    const newMatch = await this.model.create({ homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true });

    return newMatch;
  }
}
