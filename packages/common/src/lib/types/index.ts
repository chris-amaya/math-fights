export * from './game'
export * from './player'
export * from './socket-emit'
export * from './socket-on'

export interface IUser {
  id: string
  timing?: number
  finished?: boolean
  answers?: {
    correct: number
    wrong: number
  }
  rematch?: boolean
}
