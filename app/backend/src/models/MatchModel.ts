import IMatchModel from '../Interfaces/IMatchModel';
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
}
