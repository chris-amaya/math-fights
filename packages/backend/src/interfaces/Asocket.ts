import {GameDifficulty, IFinishProps} from '@math-fights/common'

export abstract class ASocket {
  queue(difficult: GameDifficulty) {}
  finish(data: IFinishProps) {}
  rematch(roomId: string) {}
  disconnect() {}
}
