import {GameDifficulty} from '@math-fights/common'
import {User} from '../entities/IUser'
import {IRoom} from '../entities/Room'

export interface IRoomRepository {
  /**
   * add methods
   */
  addRoom(difficult: GameDifficulty, user: User): IRoom['id']
  addUserToRoomById(roomId: string, user: User): User[]

  /**
   * get methods
   */
  getPlayers(roomId: string): User[]
  getOpponent(roomId: string, userId: string): User

  /**
   * update methods
   */
  updateUser(roomId: string, userId: string, user: Partial<User>): void

  /**
   * find methods
   */
  findRoomById(roomId: string): IRoom
  findRoomAvailable(difficult: GameDifficulty): IRoom | false

  /**
   * delete methods
   */
  deleteRoomById(roomId: string): IRoom
  deleteRoomByUserId(userId: string): IRoom

  /**
   * other methods
   */
  playersAreReady(roomId: string): boolean
  playersHaveFinished(roomId: string): boolean
  getWinner(roomId: string): {
    winner: User
    loser: User
    tie: boolean
  }
}
