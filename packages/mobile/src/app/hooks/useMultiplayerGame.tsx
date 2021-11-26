/**
 * This custom hook will handle all the logic of the multiplayer game
 * things like:
 * * display the questions given by the server
 * * process the answers
 * * process the abilities throw to another user
 * * process the ablities were thrown to the user
 */

import React, {useCallback, useContext, useRef, useState} from 'react'
import {TouchableOpacity, Text} from 'react-native'
import {styles} from '../styles'
import {GameMultiplayerContext} from '../context/GameMultiplayerContext'
import {GameContext} from '../context/GameContext'
import {TSocketEmitEvents, ISocketEmit} from '../types/socket-emit.types'
import {useFocusEffect} from '@react-navigation/native'
import {GameQuestions, shuffle} from '@math-fights/common'

interface IMultiplayerGame {
  question: GameQuestions
  getOptions: (
    options: number[],
    handleAnswer: (value: number) => void,
  ) => JSX.Element[]
  handleAnswer: (answer: number) => void
  index: number
}

export default function useMultiplayerGame(): IMultiplayerGame {
  const {questions, opponent} = useContext(GameMultiplayerContext)
  const {socket, timing, roomId} = useContext(GameContext)
  const [index, setIndex] = useState(0)

  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)

  const question = questions[index]

  function handleAnswer(answer: any) {
    const {result} = question

    if (answer === result) {
      setCorrectAnswers((answer: number) => answer + 1)
    } else {
      setWrongAnswers((answer: number) => answer + 1)
    }

    setIndex(index + 1)
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIndex(0)
        endGame()
      }
    }, []),
  )

  function endGame() {
    // TODO: send data to the server
    // socket.emit('player-finished', {
    //   correctAnswers,
    //   timing,
    //   roomId,
    // } as ISocketEmit['player-finished'])
  }

  function getOptions(
    options: number[],
    callback: (value: number) => void,
  ): JSX.Element[] {
    options = shuffle(options)
    return options.map((option, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.cardButton}
          onPress={() => callback(option)}>
          <Text style={styles.cardButtonText}>{option}</Text>
        </TouchableOpacity>
      )
    })
  }

  return {
    question,
    handleAnswer,
    getOptions,
    index,
  }
}
