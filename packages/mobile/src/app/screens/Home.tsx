import {NavigationProp} from '@react-navigation/native'
import React, {useContext, useEffect} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../common/colors'
import {GameContext, gameTypeContext} from '../context/GameContext'
import {styles} from '../styles'
import {RootStackParams} from '../types/RootStackParams'

interface Props {
  navigation: NavigationProp<RootStackParams, 'Home'>
}

export default function Home({navigation}: Props) {
  const {setMode} = useContext<gameTypeContext>(GameContext)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  function handleNavigation(value: gameTypeContext['mode']): void {
    setMode(value)
    navigation.navigate('Difficult')
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text>Welcome To</Text>
          <Text style={styles.title}>Math Fights</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/img/undraw_mathematics.png')}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.rootButtonContainer}>
            <TouchableOpacity onPress={() => handleNavigation('SINGLE_PLAYER')}>
              <View style={styles.buttonContainer}>
                <View>
                  <Icon name="happy-outline" size={30} color={colors.primary} />
                </View>
                <Text>Single Player</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rootButtonContainer}>
            <TouchableOpacity onPress={() => handleNavigation('MULTIPLAYER')}>
              <View style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                  <Icon name="happy-outline" size={30} color={colors.primary} />
                  <Icon name="happy-outline" size={30} color={colors.primary} />
                </View>
                <Text>Multiplayer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
