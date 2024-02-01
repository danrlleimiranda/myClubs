import { NextFunction, Request, Response } from 'express';
import SequelizeTeam from '../database/models/TeamModel';

export default class ValidateMatchMiddleware {
  private modelTeam = SequelizeTeam;

  async validateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    const teamHome = await this.modelTeam.findOne({
      where: { id: homeTeamId },
    });
    const teamAway = await this.modelTeam.findOne({
      where: { id: awayTeamId },
    });

    if (!teamHome || !teamAway) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    if (teamHome.teamName === teamAway.teamName) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  }
}
