import {Server, Socket} from 'socket.io'
import {notify} from '../utils/socket.utils'
import Room from './Room'
import Users from './Users'
import {ASocket} from '../interfaces/Asocket'
import {
  GameDifficulty,
  getQuestions,
  IFinishProps,
  IScocketEmitEvents,
  ISocketOnEvents,
  IUser,
} from '@math-fights/common'

export class SocketApp implements ASocket {
  private room: Room
  private users: Users
  private client: Socket
  private io: Server
  constructor(
    client: Socket<ISocketOnEvents, IScocketEmitEvents>,
    io: Server<ISocketOnEvents, IScocketEmitEvents>,
    room: Room,
    users: Users,
  ) {
    this.client = client
    this.io = io
    this.room = room
    this.users = users
  }

  queue(difficult: GameDifficulty): void {
    const user: IUser = {id: this.client.id}

    this.users.add(user)

    const roomData = this.room.findRoomAvailable(difficult)

    console.log(notify)

    if (roomData) {
      const users = this.room.addUserToRoomById(roomData.room.id, user)

      if (users) {
        const questions = getQuestions(10, difficult)

        notify(this.io, users, 'start', {
          questions,
          room: {
            ...roomData.room,
            index: roomData.index,
          },
        })
      }
    }

    if (!roomData) {
      this.room.addRoom(difficult, user)
    }
  }

  finish(data: IFinishProps): void {}

  disconnect(): void {}

  rematch(roomId: string): void {}
}
