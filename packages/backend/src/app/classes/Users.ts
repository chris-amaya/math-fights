import {IScocketEmitEvents, ISocketOnEvents, IUser} from '@math-fights/common'
import {Server, Socket} from 'socket.io'

export default class Users {
  public user: IUser[] = []

  constructor(
    private readonly client: Socket<ISocketOnEvents, IScocketEmitEvents>,
    private readonly io: Server<ISocketOnEvents, IScocketEmitEvents>,
  ) {
    this.user = []
  }

  add(user: IUser) {
    this.user.push(user)
  }

  remove(userId) {
    this.user = this.user.filter((u) => u.id !== userId)
  }

  /**
   * wrapper to notify a single user or a group of users
   * @param user
   * @param event
   * @param data the data to send
   */
  public notify<
    T extends IUser,
    K extends keyof IScocketEmitEvents,
    L extends IScocketEmitEvents[K],
  >(user: T | T[], event: K, data?: L) {
    if (user instanceof Array) {
      user.forEach((user) => {
        this.io.to(user.id).emit(event, ...(data as any))
      })
    } else {
      this.io.to(user.id).emit(event, ...(data as any))
    }
  }
}
