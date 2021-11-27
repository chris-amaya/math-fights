import {IScocketEmitEvents, ISocketOnEvents, IUser} from '@math-fights/common'
import {Server} from 'socket.io'

export default class Users {
  public user: IUser[] = []

  constructor() {
    this.user = []
  }

  add(user: IUser) {
    this.user.push(user)
  }

  remove(userId) {
    this.user = this.user.filter((u) => u.id !== userId)
  }
}
