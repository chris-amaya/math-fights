import {GameDifficulty, IFinishProps} from '@math-fights/common'

export interface ISocket {
  queue(data: GameDifficulty): void
  rematch(data: string): void
  finish(data: IFinishProps): void
  disconnect(): void
}
