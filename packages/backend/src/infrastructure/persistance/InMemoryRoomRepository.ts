import {User} from '../../core/entities/IUser'
import {IRoomRepository} from '../../core/repositories/IRoomRepository'
import {GameDifficulty, getID} from '@math-fights/common'
import {IRoom} from '../../core/entities/Room'

export class InMemoryRoomRepository implements IRoomRepository {
  private rooms: IRoom[] = []

  constructor() {
    this.rooms = []
  }

  findRoomById(roomId: string): IRoom {
    const room = this.rooms.find((room) => room.id === roomId)
    if (!room) {
      throw new Error('Room not found')
    }

    return room
  }

  deleteRoomById(roomId: string): IRoom {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId)
    const roomTmp = this.rooms.splice(roomIndex, 1)[0]
    this.rooms.splice(roomIndex, 1)

    return roomTmp
  }

  deleteRoomByUserId(userId: string): IRoom {
    const roomIndex = this.rooms.findIndex((room) =>
      room.users.some((user) => user.id === userId),
    )

    const roomTmp = this.rooms.splice(roomIndex, 1)[0]

    this.rooms.splice(roomIndex, 1)

    return roomTmp
  }

  addRoom(difficult: GameDifficulty, user: User): string {
    user.isReady = true
    const roomId = getID()

    this.rooms.push({
      id: roomId,
      difficult,
      users: [user],
    })

    return roomId
  }

  getPlayers(roomId: string): User[] {
    const room = this.findRoomById(roomId)

    return room.users
  }

  findRoomAvailable(difficult: GameDifficulty): IRoom | false {
    const roomIndex = this.rooms.findIndex(
      (room) => room.difficult === difficult && room.users.length < 2,
    )

    if (roomIndex === -1) return false

    const room = this.rooms[roomIndex]
    const {users} = room

    if (users.length !== 1) {
      return false
    }

    // its clear that the room is available because there is only one user
    return this.rooms[roomIndex]
  }

  addUserToRoomById(roomId: string, user: User): User[] {
    const room = this.findRoomById(roomId)
    user.isReady = true
    room.users.push(user)

    return room.users
  }

  playersAreReady(roomId: string): boolean {
    const users = this.getPlayers(roomId)

    if (users.length !== 2) {
      return false
    }

    // this line of code should only work when there are 2 users
    return users.every((user) => user.isReady === true)
  }

  playersHaveFinished(roomId: string): boolean {
    return (
      this.getPlayers(roomId).length === 2 &&
      this.getPlayers(roomId).every((user) => user.finished === true)
    )
  }

  getWinner(roomId: string): {
    winner: User
    loser: User
    tie: boolean
  } {
    let winner: User
    let loser: User
    let tie = false

    const [player1, player2] = this.getPlayers(roomId)

    if (!player1.answers || !player2.answers) {
      throw new Error('Answers not found')
    }

    if (player1.answers.correct === player2.answers.correct) {
      winner = player1
      loser = player2
      tie = true
    } else if (player1.answers.correct > player2.answers.correct) {
      winner = player1
      loser = player2
    } else {
      winner = player2
      loser = player1
    }

    return {
      winner,
      loser,
      tie,
    }

    // TODO: add a bonus time
  }

  getOpponent(roomId: string, userId: string): User {
    const room = this.findRoomById(roomId)

    const opponent = room.users.find((user) => user.id !== userId)

    if (!opponent) {
      throw new Error('Opponent not found')
    }

    return opponent
  }

  updateUser(roomId: string, userId: string, userData: Partial<User>): void {
    const room = this.findRoomById(roomId)

    room.users = room.users.map((user) => {
      if (user.id === userId) {
        return {...user, ...userData}
      }

      return user
    })
  }
}
