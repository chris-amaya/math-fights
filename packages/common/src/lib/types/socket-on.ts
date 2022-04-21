import {GameDifficulty} from './index'
import {IGameMode} from './game'

interface socketOn<T> {
  (data: T): void
}

export interface ISocketOnEvents {
  queue: socketOn<IQueueProps>
  finish: socketOn<IFinishProps>
  rematch: socketOn<IRematchProps>
  'end-game': any
}

export type IQueueProps = {
  difficult: GameDifficulty
  gameMode: IGameMode
}

export interface IFinishProps {
  roomId: string
  answers: {
    correct: number
    wrong: number
  }
  timer: number
}

export type IRematchProps = string
