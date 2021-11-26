import React, {useEffect} from 'react'
import {View, Text} from 'react-native'
import {styles} from '../../styles'
import useGame from '../../hooks/useGame'
import {NavigationProp} from '@react-navigation/native'
import {RootStackParams} from '../../types/RootStackParams'
import useTimer from '../../hooks/useTimer'
import useBackPress from '../../hooks/useBackPress'

interface Props {
  navigation: NavigationProp<RootStackParams, 'Game'>
}

export default function Game({navigation}: Props) {
  useBackPress(false)
  useTimer()
  const {question, index, handleAnswer, getOptions} = useGame({
    limitQuestions: 5,
  })

  useEffect(() => {
    if (!question) {
      navigation.navigate('Results')
    }
  }, [index])

  if (!question) {
    return null
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={styles.questionText}>
            {question.numbersUsed[0]} {question.sign} {question.numbersUsed[1]}={' '}
            {question.result}
          </Text>
        </View>
        <View style={styles.cardBodyContainer}>
          {getOptions([...question.fakeResults, question.result], () => {})}
        </View>
      </View>
    </View>
  )
}
