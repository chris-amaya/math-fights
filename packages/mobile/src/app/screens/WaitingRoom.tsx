import React, {useContext, useEffect, useRef, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {NavigationProp} from '@react-navigation/native'

import {styles} from '../styles'
import {GameContext} from '../context/GameContext'
import {RootStackParams} from '../types/RootStackParams'
import {Timer} from '../classes/Timer'
import {GameMultiplayerContext} from '../context/GameMultiplayerContext'

interface IProps {
  navigation: NavigationProp<RootStackParams, 'Game'>
}

export default function WaitingRoom({navigation}: IProps) {
  const {socket, difficult, setRoomId} = useContext(GameContext)
  const {setOpponent, setQuestions} = useContext(GameMultiplayerContext)
  const [time, setTime] = useState('00:00')
  const timer = useRef(new Timer())
  const isTimerActive = useRef(false)

  useEffect(() => {
    if (isTimerActive.current === false) {
      timer.current.start()
      isTimerActive.current = true
    }

    return () => {
      isTimerActive.current = false
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const {minutes, seconds} = timer.current.getTimeInParts(
        timer.current.getTime(),
      )
      setTime(`${minutes}:${seconds}`)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [time])

  useEffect(() => {
    socket.on('start', ({opponent, questions, room}) => {
      setQuestions(questions)
      setOpponent(opponent)
      setRoomId(room.id)
      navigation.navigate('[MULTIPLAYER]: Game')
    })

    socket.emit('queue', difficult)
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={localStyles.title}>Looking for an opponent</Text>
        <View>
          <Text style={localStyles.timeTitle}>Time</Text>
          <Text style={localStyles.time}>{time}</Text>
        </View>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  time: {
    textAlign: 'center',
  },
})
