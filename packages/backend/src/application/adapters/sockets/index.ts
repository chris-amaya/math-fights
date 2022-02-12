import {Server, Socket} from 'socket.io'
import {ISocket} from '../../ports/ISocket'
import {IUsersRepository} from '../../../core/repositories/IUserRepository'
import {IRoomRepository} from '../../../core/repositories/IRoomRepository'
import {User} from '../../../core/entities/IUser'
import queueUser from '../../use-cases/queue-user'
import {notify} from '../../use-cases/notify-users'

import {
  GameDifficulty,
  getQuestions,
  IFinishProps,
  IRematchProps,
  IScocketEmitEvents,
  ISocketOnEvents,
} from '@math-fights/common'
import finishUseCase from '../../use-cases/finish-event'

export class SocketAdapter implements ISocket {
  constructor(
    private users: IUsersRepository,
    private rooms: IRoomRepository,
    private client: Socket<ISocketOnEvents, ISocketOnEvents>,
    private io: Server<ISocketOnEvents, IScocketEmitEvents>,
  ) {
    this.client.on('queue', (data: any) => this.queue(data))
    this.client.on('finish', (data: any) => this.finish(data))
    this.client.on('rematch', (data: any) => this.rematch(data))
    this.client.on('end-game', () => this.disconnect())
    this.client.on('disconnect', () => this.disconnect())
    // this.client.on('error', () => this.disconnect())
  }

  queue(difficult: GameDifficulty): void {
    const user = new User(this.client.id)
    this.users.add(user)

    // fire the use case that queues the user and returns the roomID
    queueUser(difficult, user, this.rooms, this.io)
  }

  rematch(roomId: IRematchProps): void {
    if (!roomId) {
      throw new Error('Room ID is required')
    }

    const {difficult} = this.rooms.findRoomById(roomId)

    this.rooms.updateUser(roomId, this.client.id, {
      rematch: true,
    })

    const opponent = this.rooms.getOpponent(roomId, this.client.id)

    if (!opponent.rematch) {
      return notify(this.io, opponent, 'want-rematch')
    }

    const questions = getQuestions(5, difficult)
    this.rooms.getPlayers(roomId).forEach((player) => {
      notify(this.io, player, 'rematch', questions)

      this.rooms.updateUser(roomId, player.id, {
        rematch: false,
        answers: {
          correct: 0,
          wrong: 0,
        },
        timing: 0,
        finished: false,
      })
    })
  }

  finish({roomId, answers, timer}: IFinishProps): void {
    finishUseCase({
      data: {
        room: {
          id: roomId,
        },
        user: {
          answers,
          timing: timer,
          id: this.client.id,
        },
      },
      factory: {
        rooms: this.rooms,
        io: this.io,
      },
    })
  }

  disconnect(): void {
    const roomData = this.rooms.deleteRoomByUserId(this.client.id)
    notify(this.io, roomData.users, 'end-game')
    this.users.remove(this.client.id)
  }
}
