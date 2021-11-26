/**
 * this custom hook will handle all the logic of the game
 * things like
 * * create the random value to find out
 * * get the fake values to fool the user
 */

import {useFocusEffect} from '@react-navigation/native'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {TouchableOpacity, Text} from 'react-native'
import {GameContext} from '../context/GameContext'
import {styles} from '../styles'
import useQuestions from './useQuestions'

import {GameQuestions, shuffle} from '@math-fights/common'

interface Game {
  questions: GameQuestions[]
  question: GameQuestions
  index: number
  handleAnswer: (answer: number) => void
  getOptions: (options: number[], handleAnswer: () => void) => JSX.Element[]
}

interface Props {
  limitQuestions: number
}
export default function useGame({limitQuestions}: Props): Game {
  const [index, setIndex] = useState(0)
  const {setCorrectAnswers, setWrongAnswers, setGameIndex} =
    useContext(GameContext)

  const questions = useQuestions(limitQuestions)
  const question = questions[index]

  function handleAnswer(answer: number) {
    const question = questions[index]
    const isCorrect = answer === question.result

    isCorrect
      ? setCorrectAnswers((correctAnswers) => correctAnswers + 1)
      : setWrongAnswers((value) => value + 1)

    setIndex(index + 1)
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIndex(0)
        setGameIndex((value) => value + 1)
      }
    }, []),
  )

  function getOptions(
    options: number[],
    handlerAnswer: (...args) => void,
  ): JSX.Element[] {
    options = shuffle(options)
    return options.map((option, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={styles.cardButton}
          onPress={() => handlerAnswer(option)}>
          <Text style={styles.cardButtonText}>{option}</Text>
        </TouchableOpacity>
      )
    })
  }

  return {
    questions,
    question,
    index,
    handleAnswer,
    getOptions,
  }
}
