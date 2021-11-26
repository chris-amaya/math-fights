import React, {useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {styles} from '../styles'
import {colors} from '../common/colors'
import {NavigationProp} from '@react-navigation/native'
import {RootStackParams} from '../types/RootStackParams'
import {GameContext, gameTypeContext} from '../context/GameContext'

interface Props {
  navigation: NavigationProp<RootStackParams, 'Difficult'>
}

export default function Difficult({navigation}: Props) {
  const {setDifficult, mode} = useContext<gameTypeContext>(GameContext)

  function handleDifficult(value: gameTypeContext['difficult']) {
    setDifficult(value)
    navigation.navigate('Game')
    if (mode === 'SINGLE_PLAYER') {
      navigation.navigate('Game')
    }

    if (mode === 'MULTIPLAYER') {
      navigation.navigate('WaitingRoom')
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={localStyles.title}>Select the difficult</Text>
        <TouchableOpacity
          style={localStyles.button}
          onPress={() => handleDifficult('EASY')}>
          <Text style={localStyles.bottonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyles.button}
          onPress={() => handleDifficult('MEDIUM')}>
          <Text style={localStyles.bottonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={localStyles.button}
          onPress={() => handleDifficult('HARD')}>
          <Text style={localStyles.bottonText}>Hard</Text>
        </TouchableOpacity>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'stretch',
    textAlign: 'center',
    zIndex: 100,
    elevation: 100,
  },
  bottonText: {
    textAlign: 'center',
  },
})
