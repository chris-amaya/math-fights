import {IUser, IScocketEmitEvents} from '@math-fights/common'

export function notify<
  T extends IUser,
  K extends keyof IScocketEmitEvents,
  L extends IScocketEmitEvents[K],
>(io: any, users: T | T[], event: K, data?: L): void {
  if (users instanceof Array && Array.isArray(users)) {
    for (const user of users) {
      ;(io.to(user.id) as any).emit(event, data)
    }
  } else {
    ;(io.to(users.id) as any).emit(event, data)
  }
}
