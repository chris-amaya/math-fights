import {IUser} from '@math-fights/common'

export default class Users {
  public user: IUser[] = []

  constructor() {
    this.user = []
  }

  add(user: IUser) {
    this.user.push(user)
  }

  remove(userId: IUser['id']) {
    this.user = this.user.filter((u) => u.id !== userId)
  }
}
