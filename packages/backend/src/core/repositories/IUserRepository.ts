import {User} from '../entities/IUser'

export interface IUsersRepository {
  add(user: User): void
  remove(userId: string): void
}
