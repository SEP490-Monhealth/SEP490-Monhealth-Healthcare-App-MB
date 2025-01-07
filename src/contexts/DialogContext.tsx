import { createContext, useContext } from "react"

interface DialogContextType {
  showDialog: (message: string, title?: string) => void
  closeDialog: () => void
}

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
)

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
