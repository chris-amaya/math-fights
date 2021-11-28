/**
 * will return an array of questions
 */

import {useContext, useMemo} from 'react'
import {GameContext} from '../context/GameContext'
import {GameQuestions, getQuestions} from '@math-fights/common'
import {AppContext} from '../context/AppContext'

export default function useQuestions(limitQuestions: number): GameQuestions[] {
  const {gameIndex} = useContext(GameContext)
  const {difficult} = useContext(AppContext)
  if (!difficult) throw new Error('difficult is not defined')

  const questions = useMemo(
    () => getQuestions(limitQuestions, difficult),
    [difficult, limitQuestions, gameIndex],
  )

  return questions
}
