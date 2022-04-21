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
import {useFocusEffect, NavigationProp} from '@react-navigation/native'
import {GameQuestions, shuffle} from '@math-fights/common'
import {RootStackParams} from '../types/RootStackParams'
import {AppContext} from '../context/AppContext'
import useNavigateWithState from './useNavigateWithState'
import {Timer} from '../classes/Timer'

interface IMultiplayerGame {
  question: GameQuestions
  getOptions: (
    options: number[],
    handleAnswer: (value: number) => void,
  ) => JSX.Element[]
  handleAnswer: (answer: number) => void
  index: number
  endGame: () => void
}

interface Props {
  navigation: NavigationProp<RootStackParams, '[MULTIPLAYER]: Game'>
}

export default function useMultiplayerGame({
  navigation,
}: Props): IMultiplayerGame {
  const [index, setIndex] = useState(0)
  const {answers, setAnswers} = useContext(GameContext)
  const {questions} = useContext(GameMultiplayerContext)
  const {socket, roomId} = useContext(AppContext)

  const timer = useRef(new Timer())

  if (!questions) throw new Error('questions is not defined')

  const question = questions[index]

  function handleAnswer(answer: any) {
    const {result} = question

    if (answer === result) {
      setAnswers((answers) => ({...answers, correct: answers.correct + 1}))
    } else {
      setAnswers((answers) => ({...answers, wrong: answers.wrong + 1}))
    }

    setIndex(index + 1)
  }

  useFocusEffect(
    useCallback(() => {
      setAnswers({correct: 0, wrong: 0})
      timer.current.start()
      return () => {
        setIndex(0)
        timer.current.reset()
      }
    }, []),
  )

  function endGame() {
    timer.current.stop()
    console.log('finish event', timer.current.getTime())

    socket.emit('finish', {
      roomId,
      answers,
      timer: timer.current.getTime(),
    })
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
    endGame,
  }
}
