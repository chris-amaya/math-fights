import React from 'react'
import {io, Socket} from 'socket.io-client'
import {
  IScocketEmitEvents,
  ISocketOnEvents,
  GameDifficulty,
} from '@math-fights/common'
import {Timer} from '../classes/Timer'
import {RootStackParams} from '../types/RootStackParams'
import {IGameMode} from '../../../../common/src/lib/types/game'

export interface IAppContext {
  socket: Socket<IScocketEmitEvents, ISocketOnEvents>
  timer: Timer
  difficult: GameDifficulty | undefined
  setDifficult: React.Dispatch<GameDifficulty>
  mode: 'SINGLE_PLAYER' | 'MULTIPLAYER' | undefined
  setMode: React.Dispatch<this['mode']>
  gameMode: IGameMode | undefined
  setGameMode: React.Dispatch<this['gameMode']>
  roomId: string
  setRoomId: React.Dispatch<React.SetStateAction<this['roomId']>>
  URL: keyof RootStackParams | null
  setURL: React.Dispatch<React.SetStateAction<this['URL']>>
}

export const socketURL = 'http://10.0.2.2:8000'
export const AppContext = React.createContext<IAppContext>({
  socket: io(socketURL),
  timer: new Timer(),
  difficult: undefined,
  setDifficult: () => {},
  mode: undefined,
  setMode: () => {},
  roomId: '',
  setRoomId: () => {},
  URL: null,
  setURL: () => {},
  gameMode: undefined,
  setGameMode: () => {},
})
