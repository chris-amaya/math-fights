import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'

import {ISocketOnEvents, IScocketEmitEvents} from '@math-fights/common'
import {IExpress} from '../../ports/IExpress'
import {SocketAdapter} from '../sockets/index'
import {IUsersRepository} from '../../../core/repositories/IUserRepository'
import {IRoomRepository} from '../../../core/repositories/IRoomRepository'

export class ExpressAdapter implements IExpress {
  app: express.Application
  httpServer: http.Server
  io: Server<ISocketOnEvents, IScocketEmitEvents>

  constructor(
    public port: number,
    private users: IUsersRepository,
    private rooms: IRoomRepository,
  ) {
    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.io = new Server<ISocketOnEvents, IScocketEmitEvents>(this.httpServer, {
      cors: {
        origin: '*',
      },
    })
    this.setupConfig()
    this.sockets()
  }

  setupConfig(): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  setupRoutes(): void {
    throw new Error('Method not implemented.')
  }

  sockets() {
    this.io.on(
      'connection',
      (client) => new SocketAdapter(this.users, this.rooms, client, this.io),
    )
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, () => callback())
  }
}
