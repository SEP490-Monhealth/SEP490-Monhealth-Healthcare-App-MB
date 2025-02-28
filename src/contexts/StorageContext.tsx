import { createContext, useContext } from "react"

import { FoodSaveType } from "@/schemas/foodSchema"

export interface StorageContextType {
  savedFoods: FoodSaveType[]
  userAllergies: string[]
  searchHistory: string[]
  toggleSavedFood: (food: FoodSaveType) => Promise<void>
  clearSavedFoods: () => Promise<void>
  addAllergies: (allergies: string[]) => Promise<void>
  addSearchHistory: (search: string) => Promise<void>
  clearSearchHistory: () => Promise<void>
}

export const StorageContext = createContext<StorageContextType | undefined>(
  undefined
)

export const useStorage = () => {
  const context = useContext(StorageContext)

  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider")
  }

  return context
}
