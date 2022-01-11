import {useContext} from 'react'
import {ModalContext} from '../context/modal/ModalContext'

export default function useModal() {
  const context = useContext(ModalContext)
  return context
}
