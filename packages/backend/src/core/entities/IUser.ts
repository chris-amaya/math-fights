import {IUser} from '@math-fights/common'

export class User implements IUser {
  id: string
  timing?: number | undefined
  answers?: {correct: number; wrong: number} | undefined
  rematch?: boolean
  finished?: boolean
  isReady?: boolean

  constructor(id: string) {
    this.id = id
  }
}
