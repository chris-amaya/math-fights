import {User} from '../../core/entities/IUser'
import {IRoomRepository} from '../../core/repositories/IRoomRepository'
import {IRoom} from '../../core/entities/Room'
import {notify} from './notify-users'
import {Server} from 'socket.io'

import {
  GameDifficulty,
  getQuestions,
  IScocketEmitEvents,
  ISocketOnEvents,
} from '@math-fights/common'

export default function queueUser(
  difficult: GameDifficulty,
  user: User,
  db: IRoomRepository,
  io: Server<ISocketOnEvents, IScocketEmitEvents>,
) {
  let roomId: string = ''

  const roomData = db.findRoomAvailable(difficult)

  if (!roomData) {
    roomId = db.addRoom(difficult, user)
  } else {
    db.addUserToRoomById(roomData.id, user)
    roomId = roomData.id
  }

  if (db.playersAreReady(roomId)) {
    const players = db.getPlayers(roomId)
    const questions = getQuestions(5, difficult)

    // notify the players that the game can begin
    notify(io, players, 'start', {
      questions,
      room: {
        id: roomId,
        difficult,
        users: players.map((player: any) => player.id),
      },
    })
  }
}
