import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import StackNavigator from './navigator/StackNavigator'

import Modal from './components/Modal'
import AppState from './context/AppState'

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <AppState>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeScreen">
          <Drawer.Screen
            name="HomeScreen"
            options={{title: 'Home Screen'}}
            component={StackNavigator}
          />
        </Drawer.Navigator>
        <Modal />
      </NavigationContainer>
    </AppState>
  )
}
