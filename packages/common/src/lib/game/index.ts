import {GameDifficulty, GameQuestions} from '../types/game'

type TSign = 'ADD' | 'SUBSTRACT' | 'DIVIDE' | 'MULTIPLY'
function getStringSign(): TSign {
  const signs: TSign[] = ['ADD', 'SUBSTRACT', 'DIVIDE', 'MULTIPLY']
  return signs[Math.floor(Math.random() * 4)]
}

function getSignByString(sign: string) {
  type Dict = {
    [key: string]: string
  }
  const signs: Dict = {
    ADD: '+',
    SUBSTRACT: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
  }

  return signs[sign]
}

function getRandomNumberByDifficult(difficult: GameDifficulty): number {
  if (difficult === 'EASY') {
    return Math.floor(Math.random() * 10)
  }

  if (difficult === 'MEDIUM') {
    return Math.floor(Math.random() * 100)
  }

  if (difficult === 'HARD') {
    return Math.floor(Math.random() * 1000)
  }

  throw new Error('no difficult was provided')
}

function getResult(number1: number, number2: number, sign: TSign) {
  if (sign === 'ADD') {
    return number1 + number2
  }

  if (sign === 'MULTIPLY') {
    return number1 * number2
  }

  if (sign === 'DIVIDE') {
    return number1 / number2
  }

  if (sign === 'SUBSTRACT') {
    return number1 - number2
  }

  throw new Error('no sign was provided')
}

function getFakeResults(result: number): number[] {
  const start = result - 5
  const end = result + 5
  const fakeResultsLength = 3

  const fakeResults: number[] = []
  for (let index = 0; index < fakeResultsLength; index++) {
    let value = getRandomInt(start, end)

    if (value === result) {
      while (value === result) {
        value = getRandomInt(start, end)
      }

      fakeResults.push(value)
      continue
    }

    if (fakeResults.includes(value)) {
      while (fakeResults.includes(value)) {
        value = getRandomInt(start, end)
      }

      fakeResults.push(value)
      continue
    }

    fakeResults.push(value)
  }

  return fakeResults
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  const fakeResult = Math.floor(Math.random() * (max - min + 1)) + min

  return fakeResult
}

function shuffle(array: number[]) {
  let currentIndex = array.length
  let randomIndex = null

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export default function getQuestions(
  limitQuestions: number,
  difficult: GameDifficulty,
) {
  const questions: GameQuestions[] = []

  let i = 0
  while (i < limitQuestions) {
    const stringSign = getStringSign()
    const sign = getSignByString(stringSign)
    const number1 = getRandomNumberByDifficult(difficult)
    const number2 = getRandomNumberByDifficult(difficult)

    const result = getResult(number1, number2, stringSign)

    const fakeResult = getFakeResults(result)

    const obj: GameQuestions = {
      sign,
      result,
      fakeResults: [...fakeResult],
      numbersUsed: [number1, number2],
    }

    questions.push(obj)
    i++
  }

  return questions
}

export {
  getStringSign,
  getRandomNumberByDifficult,
  getResult,
  getFakeResults,
  getSignByString,
  shuffle,
  getQuestions,
}
