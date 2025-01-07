import { createContext, useContext } from "react"

type ErrorType = (error: any) => void

export const ErrorContext = createContext<ErrorType | undefined>(undefined)

export const useError = () => {
  const context = useContext(ErrorContext)

  if (!context) {
    throw new Error("useError must be used within an ErrorProvider")
  }

  return context
}
