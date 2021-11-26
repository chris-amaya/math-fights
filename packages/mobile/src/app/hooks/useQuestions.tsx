/**
 * will return an array of questions
 */

import {useContext, useMemo} from 'react'
import {GameContext} from '../context/GameContext'
import {GameQuestions, getQuestions} from '@math-fights/common'

export default function useQuestions(limitQuestions: number): GameQuestions[] {
  const {difficult, gameIndex} = useContext(GameContext)
  const questions = useMemo(
    () => getQuestions(limitQuestions, difficult),
    [difficult, limitQuestions, gameIndex],
  )

  return questions
}
