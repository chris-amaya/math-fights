import {User} from '../../core/entities/IUser'

export interface IQueue {
  user: User

  queueUser(data: any): void
  dequeueUser(data: any): void
}
