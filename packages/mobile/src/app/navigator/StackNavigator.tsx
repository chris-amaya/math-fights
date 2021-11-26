import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'
import Home from '../screens/Home'
import {RootStackParams} from '../types/RootStackParams'
import Difficult from '../screens/Difficult'
import Game from '../screens/SinglePlayer/Game'
import Results from '../screens/Results'
import {DrawerScreenProps} from '@react-navigation/drawer'
import BarIcon from './BarIcon'
import WaitingRoom from '../screens/WaitingRoom'
import MultiplayerGame from '../screens/MultiPlayer/Game'
import ResultsMultiplayer from '../screens/MultiPlayer/Results/Results'

const Stack = createStackNavigator<RootStackParams>()
interface Props extends DrawerScreenProps<any, any> {}
export default function StackNavigator({navigation, route}: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BarIcon navigation={navigation} route={route} />,
        title: '',
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Difficult" component={Difficult} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="WaitingRoom" component={WaitingRoom} />

      <Stack.Screen name="[MULTIPLAYER]: Game" component={MultiplayerGame} />
      <Stack.Screen
        name="[MULTIPLAYER]: Results"
        component={ResultsMultiplayer}
      />
    </Stack.Navigator>
  )
}
