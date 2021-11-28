import React from 'react'
import {View, StyleSheet, Text, ViewStyle, TextStyle} from 'react-native'
import {styles} from '../../styles'
import {IPlayer} from '@math-fights/common'
import {colors} from '../../common/colors'

type OmitProps = 'id' | 'roomId' | 'score' | 'timing'

interface Props extends Omit<IPlayer, OmitProps> {
  isOpponent: boolean
  timing: string
}

export default function PlayerCard({answers, timing, isOpponent}: Props) {
  const title = isOpponent ? 'Enemy Performance' : 'Your Performance'

  const base = StyleSheet.create({
    card: {
      ...styles.card,
      borderRadius: 10,
      marginBottom: 10,
    },
    titleText: {
      textAlign: 'center',
      justifyContent: 'center',
    },
    resultTitle: {
      ...localStyles.resultTitle,
    },
    resultText: {
      ...localStyles.resultText,
    },
  })

  const userTheme = StyleSheet.create({
    card: {
      ...base.card,
      backgroundColor: colors.accent,
    },
    titleText: {
      ...styles.title,
      ...base.titleText,
      color: '#fff',
    },
    resultTitle: {
      ...base.resultTitle,
      color: '#fff',
    },
    resultText: {...base.resultText, color: '#fff'},
  })
  const opponentTheme = StyleSheet.create({
    card: {
      ...base.card,
      backgroundColor: '#F9A826',
    },
    titleText: {
      ...styles.title,
      ...base.titleText,
      color: '#fff',
    },
    resultTitle: {
      ...base.resultTitle,
      color: '#fff',
      fontWeight: 'bold',
    },
    resultText: {...base.resultText, color: '#fff'},
  })

  const theme = isOpponent ? opponentTheme : userTheme

  return (
    <View style={theme.card}>
      <View style={{alignContent: 'center'}}>
        <Text style={theme.titleText}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={localStyles.resultContainer}>
          <Text style={theme.resultTitle}>Correct</Text>
          <Text style={theme.resultText}>{answers.correct}</Text>
        </View>
        <View style={localStyles.resultContainer}>
          <Text style={theme.resultTitle}>Wrong</Text>
          <Text style={theme.resultText}>{answers.wrong}</Text>
        </View>
        <View style={localStyles.resultContainer}>
          <Text style={theme.resultTitle}>Timing</Text>
          <Text style={theme.resultText}>{timing}</Text>
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
