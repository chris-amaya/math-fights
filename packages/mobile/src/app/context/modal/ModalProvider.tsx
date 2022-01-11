import React, {useEffect, useState} from 'react'
import Modal from '../../components/Modal'
import {ModalContext} from './ModalContext'

interface Props {
  children: React.ReactNode
}

interface IModalProps {
  content: {
    type: JSX.Element
    props: any
  }
  title?: string
}

interface IHandlers {
  close: (() => Promise<any>) | undefined
  confirm: (() => Promise<any>) | undefined
}

export default function ModalProvider({children}: Props) {
  const [show, setShow] = useState(false)
  const [modalProps, setModalProps] = useState<IModalProps | null>(null)
  const [handlers, setHandlers] = useState<IHandlers | null>(null)
  const [disable, setDisable] = useState(false)

  interface IOptionModal {
    title?: string
    close?: () => Promise<any>
    confirm?: () => Promise<any>
  }

  function modal(
    content: JSX.Element,
    props = {},
    {...options}: IOptionModal = {},
  ) {
    console.log('modal')

    const {title, close, confirm} = options
    setHandlers({
      close: close,
      confirm: confirm,
    })
    setModalProps({content: {type: content, props}, title})
  }

  function onCloseModal() {
    console.log('onCloseModal')

    setShow(false)
    setDisable(false)
    if (handlers?.close) {
      handlers.close() // may be async, we'll push through this one. Not expecting a result
    }
    // handlers?.close?.()
  }

  function onConfirmModal() {
    if (handlers?.confirm) {
      setDisable(true)
      handlers.confirm()?.then((result) => {
        console.log('result', result)

        if (result == null) return setShow(false)

        if (typeof result === 'object') {
          if (result.success) return onCloseModal()
          if (result.props != null) {
            const newProps = {...modalProps}
            if (newProps.content) {
              newProps.content.props = {
                ...newProps.content?.props,
                ...result.props,
              }
            }
          }

          setDisable(false)
          return
        }
        onCloseModal()
      })
    } else onCloseModal()
  }

  useEffect(() => {
    if (!modalProps || !handlers) return
    setShow(true)
  }, [modalProps, handlers])

  useEffect(() => {
    if (!show) {
      // NOTE: closed, call close handler if avail.

      // NOTE: clear state
      setModalProps(null)
      setHandlers(null)
    }
  }, [show])

  return (
    <ModalContext.Provider value={{modal}}>
      {children}
      <Modal
        show={show}
        disabled={disable}
        close={onCloseModal}
        confirm={onConfirmModal}
        {...modalProps}
      />
    </ModalContext.Provider>
  )
}
