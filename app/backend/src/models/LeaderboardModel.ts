import SequelizeMatch from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/TeamModel';

interface SequelizeTeamInstance extends SequelizeTeam {
  homeTeam: SequelizeMatch[];
}

type ResultType = {
  name: string;
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};
export default class LeaderboardModel {
  private model = SequelizeTeam;
  private result = {
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0 };

  static reducedResults(match: SequelizeTeamInstance) {
    return (acc: ResultType, curr: SequelizeMatch) => {
      acc.name = match.teamName;
      acc.totalGames = match.homeTeam.length;
      acc.goalsFavor += curr.homeTeamGoals;
      acc.totalDraws = curr.homeTeamGoals === curr.awayTeamGoals
        ? acc.totalDraws += 1 : acc.totalDraws;
      acc.totalLosses = curr.homeTeamGoals < curr.awayTeamGoals
        ? acc.totalLosses += 1 : acc.totalLosses;
      acc.totalVictories = curr.homeTeamGoals > curr.awayTeamGoals
        ? acc.totalVictories += 1 : acc.totalVictories;
      acc.totalPoints = acc.totalVictories * 3 + acc.totalDraws;
      acc.efficiency = Number(((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2));
      acc.goalsOwn += curr.awayTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;

      return acc;
    };
  }

  calculateResults(matches: SequelizeTeamInstance[]) {
    const results = matches.map((match) => {
      const result = match.homeTeam.reduce(
        LeaderboardModel.reducedResults(match),
        { name: match.teamName, ...this.result },
      );

      return result;
    });

    const leaderboard = results.sort((a: ResultType, b: ResultType) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if ((a.totalPoints === b.totalPoints) && (a.goalsBalance > b.goalsBalance)) return -1;
      if ((a.totalPoints === b.totalPoints) && (a.goalsBalance < b.goalsBalance)) return 1;
      if ((a.totalPoints === b.totalPoints) && (a.goalsBalance === b.goalsBalance)
       && (a.goalsFavor > b.goalsFavor)) return -1;

      return 0;
    });

    return leaderboard;
  }

  async getLeaderboardHome() {
    const matchesUnfiltered = await this.model.findAll({
      include: { model: SequelizeMatch, as: 'homeTeam' },
    }) as SequelizeTeamInstance[];

    const matches = matchesUnfiltered.map((match) => ({
      id: match.id,
      teamName: match.teamName,
      homeTeam: match.homeTeam.filter((home) => !home.inProgress),
    })) as SequelizeTeamInstance[];

    return this.calculateResults(matches);
  }
}
