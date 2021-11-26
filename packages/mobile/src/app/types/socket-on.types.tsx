import {IUser} from './socket-emit.types'
export type TSocketOnEvents = 'init-game' | 'game-continue' | 'winner' | 'stats'
export interface ISocketOn {
  'init-game': IInitGame
  'game-continue': {
    rematch: boolean
    questions: IQuestion[]
  }
}

export interface IInitGame {
  opponent: IUser
  questions: IQuestion[]
  roomId: string
}

export interface IQuestion {
  stringSign: string
  sign: string
  number1: number
  number2: number
  result: number
  fakeResults: number[]
}
