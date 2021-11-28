/**
 * this custom hook will handle all the logic of the game
 * things like
 * * create the random value to find out
 * * get the fake values to fool the user
 */

import {useFocusEffect} from '@react-navigation/native'
import React, {useCallback, useContext, useState} from 'react'
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
  getOptions: (
    options: number[],
    handleAnswer: (value: number) => void,
  ) => JSX.Element[]
}

interface Props {
  limitQuestions: number
}
export default function useGame({limitQuestions}: Props): Game {
  const [index, setIndex] = useState(0)
  const {setAnswers, setGameIndex} = useContext(GameContext)

  const questions = useQuestions(limitQuestions)
  const question = questions[index]

  function handleAnswer(answer: number) {
    const question = questions[index]
    const isCorrect = answer === question.result

    isCorrect
      ? setAnswers((answers) => ({...answers, correct: answers.correct + 1}))
      : setAnswers((answers) => ({...answers, wrong: answers.wrong + 1}))

    setIndex(index + 1)
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIndex(0)
        setAnswers({correct: 0, wrong: 0})
        setGameIndex((value) => value + 1)
      }
    }, []),
  )

  function getOptions(
    options: number[],
    handlerAnswer: (value: number) => void,
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
