import 'react-native-gesture-handler'
import React, {ReactNode, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {io} from 'socket.io-client'
import StackNavigator from './navigator/StackNavigator'

import {gameTypeContext, GameContext, socketURL} from './context/GameContext'
import {Timer} from './classes/Timer'
import {GameMultiplayerContext} from './context/GameMultiplayerContext'
import {IInitGame} from './types/socket-on.types'
import {ModalContext} from './context/ModalContext'
import Modal from './components/Modal'
import {GameQuestions} from '@math-fights/common'

const socket = io(socketURL)

socket.on('connect', () => {
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

const Drawer = createDrawerNavigator()

function AppState({children}: {children: ReactNode}) {
  const [difficult, setDifficult] = useState<gameTypeContext['difficult']>()
  const [mode, setMode] = useState<gameTypeContext['mode']>()
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = useState<number>(0)
  const [timing, setTiming] = useState<number>(0)
  const [roomId, setRoomId] = useState('')

  const [opponent, setOpponent] = useState({id: ''})
  const [questions, setQuestions] = useState<GameQuestions[]>()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [gameIndex, setGameIndex] = useState(0)

  return (
    <GameContext.Provider
      value={{
        difficult,
        setDifficult,
        mode,
        setMode,
        correctAnswers,
        setCorrectAnswers,
        wrongAnswers,
        setWrongAnswers,
        timing,
        setTiming,
        timer: new Timer(),
        socket,
        roomId,
        setRoomId,
        gameIndex,
        setGameIndex,
      }}>
      <GameMultiplayerContext.Provider
        value={{opponent, setOpponent, questions, setQuestions}}>
        <ModalContext.Provider
          value={{title, setTitle, text, setText, isVisible, setIsVisible}}>
          {children}
        </ModalContext.Provider>
      </GameMultiplayerContext.Provider>
    </GameContext.Provider>
  )
}

export default function App() {
  return (
    <AppState>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeScreen" screenOptions={{}}>
          <Drawer.Screen
            name="HomeScreen"
            options={{title: 'Home Screen'}}
            component={StackNavigator}
          />
        </Drawer.Navigator>
        <Modal />
      </NavigationContainer>
    </AppState>
  )
}
