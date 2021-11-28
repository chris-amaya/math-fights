import React, {createContext} from 'react'

export interface modalTypeContext {
  title: string
  setTitle: React.Dispatch<this['title']>
  text: string
  setText: React.Dispatch<this['text']>
  isVisible: boolean
  setIsVisible: React.Dispatch<this['isVisible']>
}

export const ModalContext = createContext<modalTypeContext>({
  title: '',
  setTitle: () => {},
  text: '',
  setText: () => {},
  isVisible: false,
  setIsVisible: () => {},
})
