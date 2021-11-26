import {DrawerScreenProps} from '@react-navigation/drawer'
import React from 'react'
import {View, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import {colors} from '../common/colors'

interface Props extends DrawerScreenProps<any, any> {}
export default function BarIcon({navigation}: Props) {
  return (
    <TouchableOpacity
      style={localStyles.iconContainer}
      onPress={() => navigation.toggleDrawer()}>
      <View>
        <Icon name="menu-outline" size={20} color={colors.primary} />
      </View>
    </TouchableOpacity>
  )
}

const localStyles = StyleSheet.create({
  iconContainer: {
    marginLeft: 10,
  },
})
