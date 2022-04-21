export interface GameQuestions {
  numbersUsed: number[]
  sign: string
  fakeResults: number[]
  result: number
}

export type GameDifficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type IGameMode = 'find-result' | 'find-number'
