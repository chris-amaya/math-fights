import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'

import {ISocketOnEvents, IScocketEmitEvents} from '@math-fights/common'
import socketController from './sockets/socket'

export default class AppServer {
  public app: express.Application
  public port: number
  public httpServer
  public io: Server<ISocketOnEvents, IScocketEmitEvents>

  constructor(port: number) {
    this.port = port
    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.io = new Server<ISocketOnEvents, IScocketEmitEvents>(this.httpServer, {
      cors: {
        origin: '*',
      },
    })
    this.middlewares()

    this.sockets()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  sockets() {
    this.io.on('connection', (client) => socketController(client, this.io))
  }

  start(callback: () => void) {
    this.httpServer.listen(this.port, () => callback())
  }
}
