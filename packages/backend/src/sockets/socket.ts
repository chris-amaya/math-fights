import {Server, Socket} from 'socket.io'

import Users from '../classes/Users'
import Room from '../classes/Room'
import {ISocketOnEvents, IScocketEmitEvents} from '@math-fights/common'
import {
  disconnect,
  finish,
  queue,
  rematch,
} from '../controllers/socket.controller'

interface ISocket {
  (
    client: Socket<ISocketOnEvents, IScocketEmitEvents>,
    io: Server<ISocketOnEvents, IScocketEmitEvents>,
  ): void
}

export interface ISocketContext {
  client: Socket<ISocketOnEvents, IScocketEmitEvents>
  io: Server<ISocketOnEvents, IScocketEmitEvents>
  users: Users
  room: Room
}

const users = new Users()
const room = new Room()

export const socket: ISocket = (client, io) => {
  const context: ISocketContext = {
    client,
    io,
    users,
    room,
  }

  client.on('queue', (data) => queue.call(context, data))
  client.on('finish', (data) => finish.call(context, data))
  client.on('rematch', ({roomId}) => rematch.call(context, roomId))
  client.on('end-game', () => disconnect.call(context))
  client.on('disconnect', () => disconnect.call(context))
}

export default socket
