import React, {createContext} from 'react'

interface answers {
  correct: number
  wrong: number
}

export interface gameTypeContext {
  answers: answers
  setAnswers: React.Dispatch<React.SetStateAction<answers>>
  timing: string
  setTiming: React.Dispatch<React.SetStateAction<string>>

  gameIndex: number
  setGameIndex: React.Dispatch<React.SetStateAction<number>>
}

export const GameContext = createContext<gameTypeContext>({
  answers: {
    correct: 0,
    wrong: 0,
  },
  setAnswers: () => {},
  timing: '',
  setTiming: () => {},
  gameIndex: 0,
  setGameIndex: () => {},
})
