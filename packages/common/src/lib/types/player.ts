export interface IPlayer {
  id: string
  timing: string
  roomId: string
  answers: {
    corret: number
    wrong: number
  }
  score: number
}
