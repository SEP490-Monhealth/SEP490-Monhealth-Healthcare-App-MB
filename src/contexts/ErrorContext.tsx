import { createContext, useContext } from "react"

type ErrorHandler = (error: any) => void

export const ErrorContext = createContext<ErrorHandler | undefined>(undefined)

export const useErrorHandler = () => {
  const context = useContext(ErrorContext)

  if (!context) {
    throw new Error("useErrorHandler must be used within an ErrorProvider")
  }

  return context
}
