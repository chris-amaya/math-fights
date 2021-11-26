import React from 'react'
import {BackHandler} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

// TODO: add alert if the user is trying to go back

function useBackPress(callback: () => void): void
function useBackPress(canGoBack: boolean): void
function useBackPress(arg: boolean | (() => void)): void {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (typeof arg === 'function') {
          arg()
          return true
        } else if (typeof arg === 'boolean') {
          if (arg) {
            return false
          } else {
            return true
          }
        }
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, []),
  )
}

export default useBackPress
