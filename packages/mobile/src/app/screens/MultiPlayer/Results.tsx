import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {styles} from '../../styles'
import {colors} from '../../common/colors'
import {useContext} from 'react'
import {GameContext} from '../../context/GameContext'
import {NavigationProp} from '@react-navigation/core'
import {RootStackParams} from '../../types/RootStackParams'
import useBackPress from '../../hooks/useBackPress'
import PlayerCard from './PlayerCard'
import {GameMultiplayerContext} from '../../context/GameMultiplayerContext'
import {AppContext} from '../../context/AppContext'
import {ModalContextOld} from '../../context/ModalContext.old'
import Modal from '../../components/Modal.old'

interface Props {
  navigation: NavigationProp<RootStackParams, 'Results'>
}
export default function Results({navigation}: Props) {
  useBackPress(() => {
    navigation.navigate('Home')
  })

  const {opponent, winner, tie, setQuestions} = useContext(
    GameMultiplayerContext,
  )
  const {timer, socket, roomId} = useContext(AppContext)
  const {answers, timing} = useContext(GameContext)
  const {setIsVisible, setText, setTitle} = useContext(ModalContextOld)
  const [wantRematch, setWantRematch] = useState(false)

  if (!opponent) throw new Error('Opponent is not defined')

  useEffect(() => {
    socket.on('rematch', (data) => {
      setIsVisible(false)
      setQuestions(data)
      navigation.navigate('[MULTIPLAYER]: Game')
    })

    // TODO: add event to get noticed when opponent wants to rematch
    socket.on('want-rematch', () => {
      setWantRematch(true)
      setIsVisible(true)
      setTitle('Rematch?')
      setText('Opponent wants to rematch')
    })

    socket.on('end-game', () => {
      navigation.navigate('Home')
    })
  }, [socket])

  function handleReset() {
    setTitle('Rematch')
    setText('waiting for opponent to accept the rematch')
    setIsVisible(true)
    socket.emit('rematch', {roomId})
    socket.off('want-rematch')
  }

  // if this method is called, it means the user doesnt want to rematch
  function handleRematch() {
    socket.off('want-rematch')
    socket.off('rematch')
    socket.emit('end-game')
    navigation.navigate('Home')
  }

  let winnerText = ''
  if (tie) {
    winnerText = 'Tie'
  } else if (winner) {
    if (winner.id === opponent.id) {
      winnerText = 'You Lose'
    } else {
      winnerText = 'You Win'
    }
  }

  const ButtonReset = () => (
    <TouchableOpacity
      style={{
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 15,
        paddingVertical: 5,
      }}
      onPress={handleReset}>
      <Text style={styles.cardButtonText}>Reset</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Modal
          callback={handleRematch}
          confirm={wantRematch ? <ButtonReset /> : null}></Modal>
        <View style={styles.titleContainer}>
          <Text style={{...styles.title, color: '#000'}}>{winnerText}</Text>
        </View>
        <View style={localStyles.resultContainer}>
          <PlayerCard isOpponent={false} answers={answers} timing={timing} />
          <PlayerCard
            isOpponent={true}
            answers={opponent.answers!}
            timing={timer.getTimeInString(opponent.timing!)}
          />
        </View>
        <View>
          <TouchableOpacity style={localStyles.button} onPress={handleReset}>
            <Text style={localStyles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  resultContainer: {
    padding: 20,
  },
  resultTitle: {
    fontWeight: '300',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  resultText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 15,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 5,
  },
})
