import React, {useContext, useEffect} from 'react'
import {useNavigation} from '@react-navigation/core'
import {AppContext} from '../context/AppContext'

export default function useNavigateWithState() {
  const {URL, setURL} = useContext(AppContext)
  const navigate = useNavigation()

  useEffect(() => {
    if (URL) {
      navigate.navigate(URL)
    }

    return () => {
      setURL(null)
    }
  }, [URL])
}
