import {IUser} from '@math-fights/common'

export interface IRoom {
  id: string
  difficult: 'EASY' | 'MEDIUM' | 'HARD'
  users: IUser[]
}

export default class Room implements IRoom {
  id: string
  difficult: 'EASY' | 'MEDIUM' | 'HARD'
  users: IUser[]

  constructor(id: string, difficult: 'EASY' | 'MEDIUM' | 'HARD') {
    this.id = id
    this.difficult = difficult
    this.users = []
  }
}
