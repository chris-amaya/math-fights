import {
  IFinishProps,
  IQueueProps,
  IRematchProps,
  IScocketEmitEvents,
  ISocketOnEvents,
  getQuestions,
} from '@math-fights/common'
import {Server, Socket} from 'socket.io'
import Room from './Room'
import Users from './Users'
import {IUser} from '@math-fights/common'

export default class SocketApp {
  private users: Users
  private room: Room
  constructor(
    private readonly client: Socket<ISocketOnEvents, IScocketEmitEvents>,
    private readonly io: Server<ISocketOnEvents, IScocketEmitEvents>,
  ) {
    this.users = new Users(client, io)
    this.room = new Room()

    this.client.on('queue', this.queue)
    this.client.on('finish', this.finish)
    this.client.on('rematch', this.rematch)
    this.client.on('disconnect', this.disconnect)
    this.client.on('end-game', this.disconnect)
  }

  private queue(difficult: IQueueProps) {
    const user: IUser = {id: this.client.id}

    this.users.add(user)

    const roomData = this.room.findRoomAvailable(difficult)

    if (roomData) {
      const users = this.room.addUserToRoomById(roomData.room.id, user)
      if (users) {
        const questions = getQuestions(10, difficult)
        this.users.notify(users, 'start', {
          opponent: this.room.getOpponent(roomData.room.id, user.id),
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
  private finish = ({answers, roomId, timer}: IFinishProps) => {
    this.room.updateUser(
      {
        id: this.client.id,
        finished: true,
        correctAnswers: answers.correct,
        timing: timer,
        rematch: false,
      },
      roomId,
    )

    if (this.room.bothPlayersHaveFinished(roomId)) {
      const players = this.room.getUsersInRoom(roomId)
      const {winner, loser, tie} = this.room.getWinner(players[0], players[1])

      this.users.notify(players, 'winner', {winner, loser, tie})
    }
  }

  private rematch = ({roomId}: IRematchProps) => {
    const {difficult} = this.room.getRoomById(roomId)['room']
    this.room.updateUser({id: this.client.id, rematch: true}, roomId)
    const opponent = this.room.getOpponent(roomId, this.client.id)
    if (opponent.rematch === true) {
      const questions = getQuestions(5, difficult)
      this.room.getUsersInRoom(roomId).forEach((user) => {
        this.users.notify(user, 'rematch', questions)

        this.room.updateUser(
          {
            id: user.id,
            rematch: false,
            correctAnswers: 0,
            timing: 0,
            finished: false,
            totalAnswers: 0,
          },
          roomId,
        )
      })
    }
  }
  private disconnect = () => {
    const roomData = this.room.findRoomByUser(this.client.id)
    if (roomData) {
      this.users.notify(roomData.users, 'end-game')
      this.room.deleteRoomById(roomData.id)
    }

    this.users.remove(this.client.id)
  }
}
