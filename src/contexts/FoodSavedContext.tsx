import { createContext, useContext } from "react"

import { SaveFoodType } from "@/schemas/foodSchema"

export interface FoodSavedContextType {
  saveFoodsData: SaveFoodType[]
  toggleSaveFood: (food: SaveFoodType) => Promise<void>
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
