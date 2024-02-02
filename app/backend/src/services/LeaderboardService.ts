import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) {

  }

  async getLeaderboardHome() {
    const leaderboard = await this.leaderboardModel.getLeaderboardHome();

    return { status: 'succesful', data: leaderboard };
  }

  async getLeaderboardAway() {
    const leaderboard = await this.leaderboardModel.getLeaderboardAway();

    return { status: 'succesful', data: leaderboard };
  }

  async getLeaderboard() {
    const leaderboard = await this.leaderboardModel.getLeaderboard();

    return { status: 'succesful', data: leaderboard };
  }
}
