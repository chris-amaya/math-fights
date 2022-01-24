import {IUser, IScocketEmitEvents} from '@math-fights/common'
import {Server} from 'socket.io'

type notifyContext = {
  io: Server
}

export function notify<
  T extends IUser,
  K extends keyof IScocketEmitEvents,
  L extends IScocketEmitEvents[K],
>(this: notifyContext, users: T | T[], event: K, data?: L): void {
  if (users instanceof Array && Array.isArray(users)) {
    for (const user of users) {
      ;(this.io.to(user.id) as any).emit(event, data)
    }
  } else {
    ;(this.io.to(users.id) as any).emit(event, data)
  }
}
