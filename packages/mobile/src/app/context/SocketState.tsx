import React, {useContext, useEffect, ReactNode} from 'react'
import {useNavigation} from '@react-navigation/core'

import {GameMultiplayerContext} from './GameMultiplayerContext'
import {AppContext} from './AppContext'

export default function SocketState({children}: {children: ReactNode}) {
  const navigation = useNavigation()

  useEffect(() => {}, [])

  return <>{children}</>
}
