import React, {createContext} from 'react'
import {GameQuestions, IUser} from '@math-fights/common'

export interface IGameMultiplayerContext {
  questions: GameQuestions[] | null
  setQuestions: React.Dispatch<React.SetStateAction<this['questions']>>
  opponent: IUser | null
  opponentRef: React.MutableRefObject<this['opponent']>
  setOpponent: React.Dispatch<IUser | null>
  winner: IUser | null
  setWinner: React.Dispatch<React.SetStateAction<IUser | null>>
  tie: boolean
  setTie: React.Dispatch<React.SetStateAction<boolean>>
}

export const GameMultiplayerContext = createContext<IGameMultiplayerContext>({
  questions: [],
  setQuestions: () => {},
  opponentRef: {current: null},
  opponent: null,
  setOpponent: () => {},
  winner: null,
  setWinner: () => {},
  tie: false,
  setTie: () => {},
})
