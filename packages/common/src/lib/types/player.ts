export interface IPlayer {
  id: string
  timing: number
  roomId: string
  answers: {
    correct: number
    wrong: number
  }
  score: number
}
