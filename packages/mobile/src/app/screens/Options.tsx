import {View, Text, TouchableOpacity} from 'react-native'
import React, {useContext} from 'react'
import {styles} from '../styles'
import {NavigationProp} from '@react-navigation/native'
import {RootStackParams} from '../types/RootStackParams'
import {IGameMode} from '@math-fights/common'
import {AppContext} from '../context/AppContext'

interface Props {
  navigation: NavigationProp<RootStackParams, 'Options'>
}

export default function Options({navigation}: Props) {
  const {setGameMode} = useContext(AppContext)

  function handlePress(gameMode: IGameMode) {
    setGameMode(gameMode)
    navigation.navigate('Difficult')
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text>Select the game you want to play</Text>
        </View>
        <View style={styles.cardBodyContainer}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => handlePress('find-result')}>
            <Text style={styles.cardButtonText}>find the result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => handlePress('find-number')}>
            <Text style={styles.cardButtonText}>find the number</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
