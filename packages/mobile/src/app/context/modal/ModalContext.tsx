import {createContext} from 'react'

export interface TModalContext {
  modal: (...args: any) => void
}

export const ModalContext = createContext<TModalContext>({
  modal: (...args: any) => {
    console.log('modal from context')
  },
})
// export const ModalContext = createContext({})
