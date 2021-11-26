import {GameQuestions} from './game'
import {IUser} from './index'

interface socketEmit<T> {
  (data: T): void
}

export type IScocketEmitEvents = {
  start: IStart | socketEmit<IStart>
  rematch: IRematch | socketEmit<IRematch>
  winner: IWinner | socketEmit<IWinner>
  'end-game': any | socketEmit<any>
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
