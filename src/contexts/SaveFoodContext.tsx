import { createContext, useContext } from "react"

import { SaveFoodType } from "@/schemas/foodSchema"

export interface SaveFoodContextType {
  saveFoodsData: SaveFoodType[]
  toggleSaveFood: (food: SaveFoodType) => Promise<void>
  clearFoodSaved: () => Promise<void>
}

export const SaveFoodContext = createContext<SaveFoodContextType | undefined>(
  undefined
)

export const useSaveFoods = () => {
  const context = useContext(SaveFoodContext)
  if (!context) {
    throw new Error("useSaveFoods must be used within a SaveFoodProvider")
  }
  return context
}
