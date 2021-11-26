import {GameQuestions} from './game'
import {IUser} from './index'

export type IScocketEmitEvents = {
  start: IStart
  rematch: IRematch
  winner: IWinner
  'end-game': any
}

export interface IStart {
  opponent: IUser
  questions: GameQuestions[]
  room: IRoom
}

interface IRoom {
  id: string
  difficult: 'EASY' | 'MEDIUM' | 'HARD'
  users: IUser[]
  index?: number
}

type IRematch = GameQuestions[]

interface IWinner {
  winner: IUser
  loser: IUser
  tie: boolean
}

// interface IFinish {

// }
