import { createContext, useContext } from "react"

import { FoodSaveType } from "@/schemas/foodSchema"

export interface StorageContextType {
  savedFoods: FoodSaveType[]
  userAllergies: string[]
  searchFoodHistory: string[]
  searchConsultantHistory: string[]
  toggleSavedFood: (food: FoodSaveType) => Promise<void>
  clearSavedFoods: () => Promise<void>
  addAllergies: (allergies: string[]) => Promise<void>
  addSearchFoodHistory: (search: string) => Promise<void>
  clearSearchFoodHistory: () => Promise<void>
  addSearchConsultantHistory: (search: string) => Promise<void>
  clearSearchConsultantHistory: () => Promise<void>
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
