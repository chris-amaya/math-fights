import {
  GameDifficulty,
  getQuestions,
  IUser,
  IFinishProps,
} from '@math-fights/common'
import {ISocketContext} from '../sockets/socket'
import {notify} from '../utils/socket.utils'

function queue(this: ISocketContext, difficult: GameDifficulty) {
  const user: IUser = {id: this.client.id}

  this.users.add(user)

  const roomData = this.room.findRoomAvailable(difficult)

  if (roomData) {
    const users = this.room.addUserToRoomById(roomData.room.id, user)

    if (users) {
      const questions = getQuestions(10, difficult)

      notify.call(this, users, 'start', {
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

function finish(this: ISocketContext, {answers, roomId, timer}: IFinishProps) {
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

    notify.call(this, players, 'winner', {
      winner,
      loser,
      tie,
    })
  }
}

function rematch(this: ISocketContext, roomId: string) {
  const {difficult} = this.room.getRoomById(roomId)['room']
  this.room.updateUser({id: this.client.id, rematch: true}, roomId)
  const opponent = this.room.getOpponent(roomId, this.client.id)
  if (opponent.rematch === true) {
    const questions = getQuestions(5, difficult)
    this.room.getUsersInRoom(roomId).forEach((user) => {
      notify.call(this, user, 'rematch', questions)

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
    notify.call(this, opponent, 'want-rematch')
  }
}

function disconnect(this: ISocketContext) {
  console.log('disconnect', this.client.id)

  const roomData = this.room.findRoomByUser(this.client.id)
  if (roomData) {
    notify.call(this, roomData.users, 'end-game')
    this.room.deleteRoomById(roomData.id)
  }

  this.users.remove(this.client.id)
}

export {queue, finish, rematch, disconnect}
