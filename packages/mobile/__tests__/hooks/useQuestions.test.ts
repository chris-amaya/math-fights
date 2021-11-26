import 'react-native'
import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import useQuestions from '../../src/app/hooks/useQuestions'

beforeAll(() => {
  const mockContext = (React.useContext = jest.fn())
  mockContext.mockReturnValue({
    difficult: 'EASY',
  })
})

describe('testing on useQuestions', () => {
  test('should be length of 5', () => {
    const {result, rerender} = renderHook(() => useQuestions(5))
    expect(result.current.length).toBe(5)
  })
})
