import {useFocusEffect} from '@react-navigation/core'
import React, {useCallback} from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import {GameContext} from '../context/GameContext'

// TODO: change to use reference istead of context

export default function useTimer() {
  const {timer} = useContext(AppContext)
  const {setTiming} = useContext(GameContext)
  useFocusEffect(
    useCallback(() => {
      timer.start()
      return () => {
        timer.stop()
        setTiming(timer.getTimeInString(timer.getTime()))
        timer.reset()
      }
    }, []),
  )
}
