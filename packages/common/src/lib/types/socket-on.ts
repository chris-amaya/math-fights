import {GameDifficulty} from './index'

interface socketOn<T> {
  (data: T): void
}

export interface ISocketOnEvents {
  queue: socketOn<IQueueProps>
  finish: socketOn<IFinishProps>
  rematch: socketOn<IRematchProps>
  'end-game': any
}

export type IQueueProps = GameDifficulty

export interface IFinishProps {
  roomId: string
  answers: {
    correct: number
    wrong: number
  }
  timer: number
}

// export interface IRematchProps {
//   roomId: string
// }

export type IRematchProps = string
