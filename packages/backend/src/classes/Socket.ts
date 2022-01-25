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

  finish({answers, roomId, timer}: IFinishProps) {
    this.room.updateUser(
      {
        id: this.client.id,
        finished: true,
        answers,
        timing: timer,
        rematch: false,
      },
      roomId,
    )

    if (this.room.bothPlayersHaveFinished(roomId)) {
      const players = this.room.getUsersInRoom(roomId)
      const {winner, loser, tie} = this.room.getWinner(players[0], players[1])

      notify(this.io, players, 'winner', {
        winner,
        loser,
        tie,
      })
    }
  }

  rematch(roomId: string): void {
    const {difficult} = this.room.getRoomById(roomId)['room']
    this.room.updateUser({id: this.client.id, rematch: true}, roomId)
    const opponent = this.room.getOpponent(roomId, this.client.id)
    if (opponent.rematch === true) {
      const questions = getQuestions(5, difficult)
      this.room.getUsersInRoom(roomId).forEach((user) => {
        notify(this.io, user, 'rematch', questions)

        this.room.updateUser(
          {
            id: user.id,
            rematch: false,
            answers: {
              correct: 0,
              wrong: 0,
            },
            timing: 0,
            finished: false,
          },
          roomId,
        )
      })
    } else {
      notify(this.io, opponent, 'want-rematch')
    }
  }

  disconnect(): void {}
}
