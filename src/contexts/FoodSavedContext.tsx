import { createContext, useContext } from "react"

import { FoodSaveType } from "@/schemas/foodSchema"

export interface FoodSavedContextType {
  saveFoodsData: FoodSaveType[]
  toggleSaveFood: (food: FoodSaveType) => Promise<void>
  clearFoodSaved: () => Promise<void>
}

export const FoodSavedContext = createContext<FoodSavedContextType | undefined>(
  undefined
)

export const useSaveFoods = () => {
  const context = useContext(FoodSavedContext)

  if (!context) {
    throw new Error("useSaveFoods must be used within a SaveFoodProvider")
  }
  
  return context
}
