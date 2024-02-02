import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) {

  }

  async getLeaderboardHome() {
    const leaderboard = await this.leaderboardModel.getLeaderboardHome();

    return { status: 'succesful', data: leaderboard };
  }
}
