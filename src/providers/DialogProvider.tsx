import React, { useState } from "react"

import { Dialog } from "@/components/global/atoms"

import { DialogContext } from "@/contexts/DialogContext"

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("Thông báo")

  const showDialog = (msg: string, dialogTitle = "Thông báo") => {
    setMessage(msg)
    setTitle(dialogTitle)
    setIsVisible(true)
  }

  const closeDialog = () => {
    setIsVisible(false)
    setMessage("")
    setTitle("Thông báo")
  }

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      <Dialog
        isVisible={isVisible}
        onClose={closeDialog}
        title={title}
        description={message}
      />
    </DialogContext.Provider>
  )
}
