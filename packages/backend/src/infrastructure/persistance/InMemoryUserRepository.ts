import {User} from '../../core/entities/IUser'
import {IUsersRepository} from '../../core/repositories/IUserRepository'

export class InMemoryUserRepository implements IUsersRepository {
  constructor(private users: User[] = []) {}

  add(user: User): User {
    this.users.push(user)

    return user
  }

  remove(userId: string): void {
    this.users = this.users.filter((u) => u.id !== userId)
  }
}
