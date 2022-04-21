import {GameDifficulty, IFinishProps, IGameMode} from '@math-fights/common'

export interface ISocket {
  queue(difficult: GameDifficulty, gameMode: IGameMode): void
  rematch(data: string): void
  finish(data: IFinishProps): void
  disconnect(): void
}
