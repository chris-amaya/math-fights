import RNModal from 'react-native-modal'
import React, {useContext, useEffect} from 'react'
import {ModalContext} from '../context/ModalContext'
import {Button, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {styles} from '../styles'
import {colors} from '../common/colors'
import Spacer from './Spacer'

export default function Modal() {
  const {isVisible, text, setIsVisible, setText} = useContext(ModalContext)

  function handleCloseModal() {
    setIsVisible(false)
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
  },
})
