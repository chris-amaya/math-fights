import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {styles} from '../styles'
import {colors} from '../common/colors'
import {useContext} from 'react'
import {GameContext} from '../context/GameContext'
import {NavigationProp} from '@react-navigation/core'
import {RootStackParams} from '../types/RootStackParams'
import useBackPress from '../hooks/useBackPress'
import {AppContext} from '../context/AppContext'

interface Props {
  navigation: NavigationProp<RootStackParams, 'Results'>
}
export default function Results({navigation}: Props) {
  useBackPress(() => {
    navigation.navigate('Home')
  })

  const {answers, timing, setAnswers} = useContext(GameContext)

  function handleReset() {
    setAnswers({correct: 0, wrong: 0})
    navigation.navigate('Game')
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={{...styles.title, textAlign: 'center'}}>Results</Text>
        </View>
        <View style={styles.cardBodyContainer}>
          <View style={localStyles.resultContainer}>
            <Text style={localStyles.resultTitle}>Correct</Text>
            <Text style={localStyles.resultText}>{answers.correct}</Text>
          </View>
          <View style={localStyles.resultContainer}>
            <Text style={localStyles.resultTitle}>Wrong</Text>
            <Text style={localStyles.resultText}>{answers.wrong}</Text>
          </View>
          <View style={localStyles.resultContainer}>
            <Text style={localStyles.resultTitle}>Timing</Text>
            <Text style={localStyles.resultText}>{timing}</Text>
          </View>
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
