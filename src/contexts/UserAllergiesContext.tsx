import { createContext, useContext } from "react"

export interface UserAllergiesContextType {
  allergies: string[]
}

export const UserAllergiesContext = createContext<
  UserAllergiesContextType | undefined
>(undefined)

export const useUserAllergies = () => {
  const context = useContext(UserAllergiesContext)
  if (!context) {
    throw new Error(
      "useUserAllergies must be used within a UserAllergiesProvider"
    )
  }
  return context
}
