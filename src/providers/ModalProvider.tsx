import React, { useState } from "react"

import { Modal } from "@/components/global/atoms"

import { ModalContext } from "@/contexts/ModalContext"

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const defaultTitle = "Thông báo"

  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState(defaultTitle)

  const showModal = (msg: string, ModalTitle = defaultTitle) => {
    setMessage(msg)
    setTitle(ModalTitle)
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
    setMessage("")
    setTitle("Thông báo")
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      <Modal
        isVisible={isVisible}
        onClose={closeModal}
        title={title}
        description={message}
      />
    </ModalContext.Provider>
  )
}
