import React, {ReactNode, useState} from 'react'
import {io} from 'socket.io-client'

import {GameDifficulty, GameQuestions, IPlayer} from '@math-fights/common'
import {Timer} from '../classes/Timer'
import {GameContext, gameTypeContext} from './GameContext'
import {
  GameMultiplayerContext,
  IGameMultiplayerContext,
} from './GameMultiplayerContext'
import {AppContext, IAppContext, socketURL} from './AppContext'
import {useReferredState} from '../hooks/useReferredState'
import ModalProvider from './modal/ModalProvider'
import {ModalContext} from './modal/ModalContext'
import {ModalContextOld} from './ModalContext.old'

const socket = io(socketURL)

socket.on('connect', () => {
  console.log(socket.id)
})

export default function AppState({children}: {children: ReactNode}) {
  // AppContext
  const [difficult, setDifficult] = useState<GameDifficulty>()
  const [mode, setMode] = useState<IAppContext['mode']>()
  const [roomId, setRoomId] = useState('')
  const [URL, setURL] = useState<IAppContext['URL']>(null)

  // GameContext
  const [answers, setAnswers] = useState<gameTypeContext['answers']>({
    correct: 0,
    wrong: 0,
  })
  const [timing, setTiming] = useState<string>('')
  const [gameIndex, setGameIndex] = useState(0)

  const [questions, setQuestions] =
    useState<IGameMultiplayerContext['questions']>(null)
  const [winner, setWinner] = useState<IGameMultiplayerContext['winner']>(null)
  const [tie, setTie] = useState<IGameMultiplayerContext['tie']>(false)
  const [opponent, opponentRef, setOpponent] =
    useReferredState<IGameMultiplayerContext['opponent']>(null)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const AppValue = {
    socket,
    timer: new Timer(),
    difficult,
    setDifficult,
    mode,
    setMode,
    roomId,
    setRoomId,
    URL,
    setURL,
  }

  const gameValue = {
    answers,
    setAnswers,
    timing,
    setTiming,
    gameIndex,
    setGameIndex,
  }

  const gameMultiplayerValue = {
    opponent,
    opponentRef,
    setOpponent,
    questions,
    setQuestions,
    winner,
    setWinner,
    tie,
    setTie,
  }

  return (
    <AppContext.Provider value={AppValue}>
      <GameContext.Provider value={gameValue}>
        <GameMultiplayerContext.Provider value={gameMultiplayerValue}>
          <ModalContextOld.Provider
            value={{title, setTitle, text, setText, isVisible, setIsVisible}}>
            <ModalProvider>{children}</ModalProvider>
          </ModalContextOld.Provider>
        </GameMultiplayerContext.Provider>
      </GameContext.Provider>
    </AppContext.Provider>
  )
}
