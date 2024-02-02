import SequelizeMatch from '../database/models/MatchModel';
import SequelizeTeam from '../database/models/TeamModel';

interface SequelizeTeamInstanceHome extends SequelizeTeam {
  homeMatches: SequelizeMatch[];
}

interface SequelizeTeamInstanceAway extends SequelizeTeam {
  awayMatches: SequelizeMatch[];
}

interface SequelizeTeamInstance extends SequelizeTeam {
  homeMatches: SequelizeMatch[];
  awayMatches: SequelizeMatch[];
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

  static reducedResultsHome(match: SequelizeTeamInstanceHome) {
    return (acc: ResultType, curr: SequelizeMatch) => {
      acc.name = match.teamName;
      acc.totalGames = match.homeMatches.length;
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

  static reducedResultsAway(match: SequelizeTeamInstanceAway) {
    return (acc: ResultType, curr: SequelizeMatch) => {
      acc.name = match.awayMatches
        .every((away) => away.awayTeamId === match.id) ? match.teamName : '';
      acc.totalGames = match.awayMatches.length;
      acc.goalsFavor += curr.awayTeamGoals;
      acc.totalDraws = curr.homeTeamGoals === curr.awayTeamGoals
        ? acc.totalDraws += 1 : acc.totalDraws;
      acc.totalLosses = curr.awayTeamGoals < curr.homeTeamGoals
        ? acc.totalLosses += 1 : acc.totalLosses;
      acc.totalVictories = curr.awayTeamGoals > curr.homeTeamGoals
        ? acc.totalVictories += 1 : acc.totalVictories;
      acc.totalPoints = acc.totalVictories * 3 + acc.totalDraws;
      acc.efficiency = Number(((acc.totalPoints / (acc.totalGames * 3)) * 100).toFixed(2));
      acc.goalsOwn += curr.homeTeamGoals;
      acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;

      return acc;
    };
  }

  static sortResults() {
    return (a: ResultType, b: ResultType) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if ((a.totalPoints === b.totalPoints) && (a.goalsBalance > b.goalsBalance)) return -1;
      if ((a.totalPoints === b.totalPoints) && (a.goalsBalance < b.goalsBalance)) return 1;
      if ((a.totalPoints === b.totalPoints) && (a.goalsBalance === b.goalsBalance)
       && (a.goalsFavor > b.goalsFavor)) return -1;

      return 0;
    };
  }

  private static calculateResultsHome(matches: SequelizeTeamInstanceHome[]) {
    const results = matches.map((match) => {
      const result = match.homeMatches.reduce(
        LeaderboardModel.reducedResultsHome(match),
        { name: '',
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: 0 },
      );

      return result;
    });

    const leaderboard = results.sort(LeaderboardModel.sortResults());

    return leaderboard;
  }

  private static calculateResultsAway(matches: SequelizeTeamInstanceAway[]) {
    const results = matches.map((match) => {
      const result = match.awayMatches.reduce(
        LeaderboardModel.reducedResultsAway(match),
        { name: '',
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: 0 },
      );

      return result;
    });

    const leaderboard = results.sort(LeaderboardModel.sortResults());

    return leaderboard;
  }

  async getLeaderboardHome() {
    const matchesUnfiltered = await this.model.findAll({
      include: { model: SequelizeMatch, as: 'homeMatches' },
    }) as SequelizeTeamInstanceHome[];

    const matches = matchesUnfiltered.map((match) => ({
      id: match.id,
      teamName: match.teamName,
      homeMatches: match.homeMatches.filter((home) => !home.inProgress),
    })) as SequelizeTeamInstanceHome[];

    return LeaderboardModel.calculateResultsHome(matches);
  }

  async getLeaderboardAway() {
    const matchesUnfiltered = await this.model.findAll({
      include: { model: SequelizeMatch, as: 'awayMatches' },
    }) as SequelizeTeamInstanceAway[];

    const matches = matchesUnfiltered.map((match) => ({
      id: match.id,
      teamName: match.teamName,
      awayMatches: match.awayMatches.filter((away) => !away.inProgress),
    })).sort((a, b) => a.id - b.id) as SequelizeTeamInstanceAway[];

    return LeaderboardModel.calculateResultsAway(matches);
  }

  async getLeaderboard() {
    const matchesUnfiltered = await this.model.findAll({
      include: [{ model: SequelizeMatch, as: 'homeMatches' },
        { model: SequelizeMatch, as: 'awayMatches' }],
    }) as SequelizeTeamInstance[];

    const matches = matchesUnfiltered.map((match) => ({
      id: match.id,
      teamName: match.teamName,
      homeMatches: match.homeMatches.filter((home) => !home.inProgress),
      awayMatches: match.awayMatches.filter((away) => !away.inProgress),
    })) as SequelizeTeamInstance[];

    return matches;
  }
}
