import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import {styles} from '../../styles'
import useMultiplayerGame from '../../hooks/useMultiplayerGame'
import {NavigationProp} from '@react-navigation/native'
import {RootStackParams} from '../../types/RootStackParams'
import useTimer from '../../hooks/useTimer'
import useBackPress from '../../hooks/useBackPress'

export default function MultiplayerGame({
  navigation,
}: {
  navigation: NavigationProp<RootStackParams, '[MULTIPLAYER]: Game'>
}) {
  useBackPress(false)
  useTimer()
  const {handleAnswer, getOptions, question, index} = useMultiplayerGame()

  useEffect(() => {
    if (!question) {
      navigation.navigate('[MULTIPLAYER]: Results')
    }
  }, [index])

  if (!question) {
    return null
  }

  // const {number1, number2, sign, result} = question
  const {
    numbersUsed: [number1, number2],
    sign,
    result,
  } = question

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.questionText}>
            {number1} {sign} {number2} = {result}
          </Text>
        </View>
        <View style={styles.cardBodyContainer}>
          {getOptions([...question.fakeResults, result], () => {})}
        </View>
      </View>
    </View>
  )
}
