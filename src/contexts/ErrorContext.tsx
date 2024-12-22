import React, { createContext, useContext } from "react"

import { useRouter } from "expo-router"

const ErrorContext = createContext<any>(null)

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter()

  const handleError = (error: any) => {
    const statusCode = error.response?.status
    console.log("Trạng thái lỗi:", statusCode)

    if (statusCode === 500) {
      router.replace("/(errors)/internal-server-error")
    } else if (statusCode === 404) {
      router.replace("/(errors)/not-found")
    } else {
      console.log("Lỗi không mong muốn:", error.message || "Đã xảy ra lỗi.")
    }
  }

  return (
    <ErrorContext.Provider value={handleError}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorHandler = () => useContext(ErrorContext)
