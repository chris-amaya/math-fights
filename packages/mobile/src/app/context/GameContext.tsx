/* eslint-disable @typescript-eslint/no-empty-function */
import React, {createContext} from 'react'
import {Timer} from '../classes/Timer'
import {io, Socket} from 'socket.io-client'

import {ISocketOnEvents, IScocketEmitEvents} from '@math-fights/shared'

export interface gameTypeContext {
  difficult: 'EASY' | 'MEDIUM' | 'HARD' | undefined
  setDifficult: React.Dispatch<gameTypeContext['difficult']>
  mode: 'SINGLE_PLAYER' | 'MULTIPLAYER' | undefined
  setMode: React.Dispatch<gameTypeContext['mode']>
  correctAnswers: number
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>
  wrongAnswers: number
  setWrongAnswers: React.Dispatch<React.SetStateAction<number>>
  timing: number
  setTiming: React.Dispatch<React.SetStateAction<number>>
  timer: Timer
  socket: Socket<ISocketOnEvents, IScocketEmitEvents>
  roomId: string
  setRoomId: React.Dispatch<React.SetStateAction<this['roomId']>>
  gameIndex: number
  setGameIndex: React.Dispatch<React.SetStateAction<number>>
}

export const socketURL = 'http://10.0.2.2:8000'
export const GameContext = createContext<gameTypeContext>({
  difficult: undefined,
  setDifficult: () => {},
  mode: undefined,
  setMode: () => {},
  correctAnswers: 0,
  setCorrectAnswers: () => {},
  wrongAnswers: 0,
  setWrongAnswers: () => {},
  timing: 0,
  setTiming: () => {},
  timer: new Timer(),
  socket: io(socketURL),
  roomId: '',
  setRoomId: () => {},
  gameIndex: 0,
  setGameIndex: () => {},
})
