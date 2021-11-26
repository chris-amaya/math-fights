export type TSocketEmitEvents =
  | 'queue'
  | 'player-finished'
  | 'game-continue'
  | 'user-left'
export interface ISocketEmit {
  queue: {
    difficult: string
  }
  'player-finished': IPlayerFinished
  'game-continue': {
    roomId: string
  }
}

interface IPlayerFinished {
  timing: number
  roomId: string
  correctAnswers: number
}

export interface IUser {
  id: string
  timing?: number
  finished?: boolean
  correctAnswers?: number
  totalAnswers?: number
  rematch?: boolean
}

export interface IUserEnemy extends IUser {
  timing: number
  correctAnswers: number
}
