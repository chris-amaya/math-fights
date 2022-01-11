import RNModal from 'react-native-modal'
import React, {useContext, useEffect} from 'react'
import {ModalContextOld} from '../context/ModalContext.old'
import {Button, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {styles} from '../styles'
import {colors} from '../common/colors'
import Spacer from './Spacer'

interface Props {
  callback?: (...args: any) => void
  confirm?: JSX.Element | null
}

export default function Modal({callback, confirm}: Props) {
  const {isVisible, text, setIsVisible, setText} = useContext(ModalContextOld)

  function handleCloseModal() {
    setIsVisible(false)
    callback && callback(false)
  }

  useEffect(() => {
    if (!isVisible) {
      setText('')
    }
  }, [isVisible])

  return (
    <RNModal isVisible={isVisible}>
      <Spacer spacing={3} />
      <View style={{flex: 1}}>
        <View style={{flex: 1, ...styles.titleContainer}}>
          <View style={styles.titleContainer}>
            <Text style={localStyles.text}>{text}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={localStyles.button}
            onPress={handleCloseModal}>
            <Text style={styles.cardButtonText}>Cancel</Text>
          </TouchableOpacity>
          {confirm && confirm}
        </View>
      </View>
      <Spacer spacing={3} />
    </RNModal>
  )
}

const localStyles = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 15,
    paddingVertical: 5,
    marginBottom: 10,
  },
})
