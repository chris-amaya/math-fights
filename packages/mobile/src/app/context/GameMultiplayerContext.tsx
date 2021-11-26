/* eslint-disable @typescript-eslint/no-empty-function */
import {createContext} from 'react'
import React from 'react'
import {IInitGame} from '../types/socket-on.types'
import {IUser} from '../types/socket-emit.types'
import {GameQuestions} from '@math-fights/shared'

export interface IGameMultiplayerContext {
  questions: GameQuestions[]
  setQuestions: React.Dispatch<React.SetStateAction<GameQuestions[]>>
  opponent: IUser
  setOpponent: React.Dispatch<React.SetStateAction<IUser>>
}

export const GameMultiplayerContext = createContext<IGameMultiplayerContext>({
  questions: [],
  setQuestions: () => {},
  opponent: {id: ''},
  setOpponent: () => {},
})
