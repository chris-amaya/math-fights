import getQuestions from '../game/index'
import {getFakeResults, getResult} from '@math-fights/common'

describe('Tests on game flow', () => {
  test('should getResult doesnt return Infinity', () => {
    const result = getResult(1, 2, 'ADD')
    expect(result).not.toBe(Infinity)
  })

  test('should get fake results', () => {
    const fakeResults = getFakeResults(10)

    expect(fakeResults.length).toBe(3)
  })

  test('should get fake results', () => {
    const fakeResults = getFakeResults(11)

    expect(fakeResults.length).toBe(3)
  })

  test('should get fake results', () => {
    const fakeResults = getFakeResults(11.2)

    expect(fakeResults.length).toBe(3)
  })

  test('should get 5 questions', () => {
    const questions = getQuestions(5, 'EASY')
    expect(questions.length).toBe(5)
  })

  test('should get 10 questions', () => {
    const questions = getQuestions(10, 'EASY')
    expect(questions.length).toBe(10)
  })
})
