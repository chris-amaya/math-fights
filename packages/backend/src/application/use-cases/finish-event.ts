import {Server} from 'socket.io'
import {IRoomRepository} from '../../core/repositories/IRoomRepository'
import {notify} from './notify-users'
import {IScocketEmitEvents, ISocketOnEvents} from '@math-fights/common'
import {IRoom} from '../../core/entities/Room'
import {User} from '../../core/entities/IUser'

interface Props {
  factory: {
    rooms: IRoomRepository
    io: Server<ISocketOnEvents, IScocketEmitEvents>
  }
  data: {
    user: Pick<User, 'answers' | 'timing' | 'id'>
    room: Pick<IRoom, 'id'>
  }
}

export default function finishUseCase({factory, data}: Props) {
  const {rooms, io} = factory
  const {user, room} = data

  const roomId = room.id
  const {answers, timing, id: userId} = user

  rooms.updateUser(roomId, userId, {
    finished: true,
    answers,
    timing,
  })

  if (rooms.playersHaveFinished(roomId)) {
    const players = rooms.getPlayers(roomId)
    const {winner, loser, tie} = rooms.getWinner(roomId)

    notify(io, players, 'winner', {
      winner,
      loser,
      tie,
    })
  }
}
