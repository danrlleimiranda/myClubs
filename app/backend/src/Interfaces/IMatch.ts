export default interface IMatch {
  id: number
  homeTeamId: number
  homeTeamGoals:number
  awayTeamId:number
  awayTeamGoals: number
  inProgress: boolean
}

export interface IMatchPlusTeams extends IMatch{
  homeTeam: {
    teamName: 'São Paulo'
  },
  awayTeam: {
    teamName: 'Grêmio'
  }
}
