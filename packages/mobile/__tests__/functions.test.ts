import 'react-native'
import React from 'react'
import {getFakeResults} from '@math-fights/common'
// import {getFakeResults} from '../src/common/functions'

describe('testing on getFakeResults', () => {
  test('should be length of 3', () => {
    expect(getFakeResults(30).length).toBe(3)
  })

  test('should bring different values', () => {
    const fakeResults = getFakeResults(30)
    const uniqResults = [...new Set(fakeResults)]

    expect(uniqResults).toEqual(fakeResults)
  })
})
