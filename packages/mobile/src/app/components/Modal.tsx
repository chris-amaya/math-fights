import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {colors} from '../common/colors'
import Spacer from './Spacer'

interface Props {
  show: boolean
  disabled: boolean
  close: () => void
  confirm: () => void
  modalProps?: {
    title?: string
  }
}

export default function Modal({show, close, confirm}: Props) {
  if (!show) {
    return null
  }

  return (
    <View style={style.container}>
      <Spacer spacing={4} />
      <View style={style.content}>
        <View style={style.titleContainer}>
          <Text style={{...style.text, ...style.titleText}}>Modal Text</Text>
        </View>
        <View style={style.textContainer}>
          <Text style={{...style.text}}>
            Waiting for opponent to accept rematch
          </Text>
        </View>
        <View>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
      <View style={style.buttonsContainer}>
        <TouchableOpacity
          style={{...style.button, ...style.buttonCancel}}
          onPress={close}>
          <Text style={style.buttonCancelText}>Close</Text>
        </TouchableOpacity>
        <Spacer spacing={0.2} />
        <TouchableOpacity
          style={{...style.button, ...style.buttonConfirm}}
          onPress={confirm}>
          <Text style={style.buttonConfirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <Spacer spacing={4} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginBottom: 5,
  },
  titleText: {
    fontSize: 18,
  },
  text: {
    color: '#fff',
  },
  content: {
    flex: 1,
    marginBottom: 30,
  },

  textContainer: {},

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: colors.accent,
  },
  buttonCancelText: {
    color: '#fff',
  },
  buttonConfirm: {
    backgroundColor: colors.primary,
  },
  buttonConfirmText: {
    color: '#fff',
  },
})
