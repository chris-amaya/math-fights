import {useFocusEffect} from '@react-navigation/core'
import React, {useCallback} from 'react'
import {useContext} from 'react'
import {GameContext} from '../context/GameContext'

export default function useTimer() {
  const {timer, setTiming} = useContext(GameContext)
  useFocusEffect(
    useCallback(() => {
      timer.start()
      return () => {
        timer.stop()
        setTiming(timer.getTime())
      }
    }, []),
  )
}
