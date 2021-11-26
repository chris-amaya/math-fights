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
    interface customEvent {
      event: {
        roomId: string
        asldkfasldfk: 'hola' | 'error'
      }
      event2: {
        roomId: string
        saludo: 'hola' | 'error'
      }
    }

    // socket.emit('event', {
    //   roomId: '',
    //   asldkfasldfk: 'error',
    // } as customEvent['event'])

    // socket.emit('event', {
    //   name: 'que tal',
    // }, ({}) => {

    // })

    // const d = socket.emit('event', {
    //   name: 'hola',
    // })

    // socket.emit('event', {
    //   name: 'hola',
    // }, (({id})) => {

    // })
    // socket.emit(
    //   'event',
    //   {
    //     name: 'hola',
    //   },
    //   ({id}) => {},
    // )

    // socket.emit('init')

    // socket.on('init')
    // socket.emit('queue')

    // socket.on('bla', ({id}) => {
    //   console.log(id)
    // }|1)

    // d.

    // socket.emit('asdf', {

    // }, () => {

    // })

    // socket.on('asdf', ({asdf: string}) => {

    // })

    // const d = socket.emit(
    //   'event2',
    //   {
    //     name: 'event2',
    //   },
    //   (data: object) => {},
    // )

    // socket.emit<TSocketEmitEvents>('queue', {
    //   id: socket.id,
    //   difficult,
    // } as ISocketEmit['queue'])

    // socket.on<TSocketOnEvents>(
    //   'init-game',
    //   ({opponent, questions, roomId}: ISocketOn['init-game']) => {
    //     setOpponent(opponent)
    //     setQuestions(questions)
    //     setRoomId(roomId)
    //     navigation.navigate('[MULTIPLAYER]: Game')
    //   },
    // )
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
