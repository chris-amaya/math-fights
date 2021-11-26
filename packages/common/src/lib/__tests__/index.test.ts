import getQuestions from '../game/index'

describe('Tests on game flow', () => {
  test('should get 5 questions', () => {
    const questions = getQuestions(5, 'EASY')
    expect(questions.length).toBe(5)
  })
})
