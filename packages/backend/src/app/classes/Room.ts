import {getID, IUser} from '@math-fights/common'
import {GameDifficulty} from '@math-fights/common'

export interface IRoom {
  id: string
  difficult: 'EASY' | 'MEDIUM' | 'HARD'
  users: IUser[]
}

export default class Room {
  public rooms: IRoom[] = []
  constructor() {
    this.rooms = []
  }

  addRoom(difficult: IRoom['difficult'], user: IUser) {
    const roomId: string = Room.getCodeRoom()
    this.rooms.push({
      id: roomId,
      difficult,
      users: [user],
    })
  }

  getRoom(
    difficult: GameDifficulty,
    callback: (data: {index: number; room: IRoom} | false) => void,
  ) {
    const roomData = this.findRoomAvailable(difficult)
    callback(roomData)

    return this
  }

  findRoomByUser(userId: string) {
    const roomIndex = this.rooms.findIndex((room) => {
      if (room.users[0].id === userId || room.users[1].id === userId) {
        return true
      } else {
        return false
      }
    })

    if (roomIndex === -1) {
      return false
    } else {
      return this.rooms[roomIndex]
    }
  }

  getRoomById(roomId: string) {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId)

    return {
      roomIndex,
      room: this.rooms[roomIndex],
    }
  }

  addUserToRoomById(roomId: string, user: IUser) {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId)

    const {users} = this.rooms[roomIndex]

    // if (users.length > 2) throw new Error('no space in this room')
    // users.push(user)
    users.push(user)
    return users
  }

  deleteRoomById(roomId: string) {
    const {roomIndex} = this.getRoomById(roomId)
    this.rooms.splice(roomIndex, 1)
  }

  deleteRoomByUserId(userId: string) {
    const roomIndex = this.rooms.findIndex((room) => {
      if (room.users[0].id === userId || room.users[1].id === userId) {
        return true
      } else {
        return false
      }
    })

    this.rooms.splice(roomIndex, 1)
  }

  getUsersInRoom(roomId: string | number) {
    return this.rooms.filter((room) => room.id === roomId)[0].users
  }

  getOpponent(roomId: string, userId: string) {
    const {users} = this.rooms.filter((room) => room.id === roomId)[0]

    if (users[0].id === userId) {
      return users[1]
    } else {
      return users[0]
    }
  }

  /**
   * this method should return a room that has just 1 user in it and its available
   */
  findRoomAvailable(difficult: IRoom['difficult']) {
    const roomIndex = this.rooms.findIndex(
      (room) => room.difficult === difficult && room.users.length < 2,
    )

    if (roomIndex === -1) return false

    const {users} = this.rooms[roomIndex]

    if (users) {
      if (users.length <= 1) {
        return {
          index: roomIndex,
          room: this.rooms[roomIndex],
        }
      } else {
        return false
      }
    } else return false
  }

  updateUser(user: IUser, roomId: string) {
    if (roomId) {
      const {room, roomIndex} = this.getRoomById(roomId)
      this.rooms[roomIndex].users = room.users.map((_user) => {
        if (user.id === _user.id) {
          return user
        } else {
          return _user
        }
      })
    }
  }

  bothPlayersHaveFinished(roomId: string) {
    const {room} = this.getRoomById(roomId)
    const [player1, player2] = room.users
    if (player1.finished && player2.finished) return true
    else return false
  }

  getWinner(player1: IUser, player2: IUser) {
    let winner: IUser
    let loser: IUser
    let tie = false

    if (player1.correctAnswers === player2.correctAnswers) {
      winner = player1
      loser = player2
      tie = true
    } else if (player1.correctAnswers > player2.correctAnswers) {
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

  static getCodeRoom(): string {
    return getID()
  }
}
