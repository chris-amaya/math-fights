import React, {useContext, useEffect, useRef, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {NavigationProp, RouteProp} from '@react-navigation/native'

import {styles} from '../styles'
import {RootStackParams} from '../types/RootStackParams'
import {Timer} from '../classes/Timer'
import {AppContext} from '../context/AppContext'
import {GameMultiplayerContext} from '../context/GameMultiplayerContext'
import useNavigateWithState from '../hooks/useNavigateWithState'

interface IProps {
  navigation: NavigationProp<RootStackParams, 'WaitingRoom'>
  route: RouteProp<RootStackParams, 'WaitingRoom'>
}

export default function WaitingRoom({navigation, route}: IProps) {
  useNavigateWithState()
  const {text, displayTimer: _displayTimer} = route.params
  const displayTimer = _displayTimer ?? true

  const {socket, setRoomId, setURL} = useContext(AppContext)
  const {opponentRef, setOpponent, setQuestions, setWinner, setTie} =
    useContext(GameMultiplayerContext)

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

  // TODO: remove this timer and replace for useTimer hook
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
    socket.on('start', ({questions, room}) => {
      console.log(questions)

      setQuestions(questions)

      if (room.users[0].id === socket.id) {
        setOpponent(room.users[1])
      } else {
        setOpponent(room.users[0])
      }

      setRoomId(room.id)
      setURL('[MULTIPLAYER]: Game')
    })

    socket.on('winner', ({winner, loser, tie}) => {
      setWinner(winner)
      setOpponent(winner.id === opponentRef.current!.id ? winner : loser)
      setTie(tie)
      setURL('[MULTIPLAYER]: Results')
    })
  }, [socket])

  return (
    <View style={styles.container}>
      <View>
        <Text style={localStyles.title}>{text}</Text>

        {displayTimer && (
          <View>
            <Text style={localStyles.timeTitle}>Time</Text>
            <Text style={localStyles.time}>{time}</Text>
          </View>
        )}
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
