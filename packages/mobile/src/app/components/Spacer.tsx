import React from 'react'
import {View} from 'react-native'

export default function Spacer({spacing}: {spacing: number}) {
  return <View style={{flex: spacing}}></View>
}
