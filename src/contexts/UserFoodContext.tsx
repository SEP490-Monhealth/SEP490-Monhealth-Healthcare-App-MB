import { createContext, useContext } from "react"

import { FoodSaveType } from "@/schemas/foodSchema"

export interface UserFoodContextType {
  userFoodsData: FoodSaveType[]
  userAllergiesData: string[]
  toggleFoodSaved: (food: FoodSaveType) => Promise<void>
  clearFoodSaved: () => Promise<void>
}

export const UserFoodContext = createContext<UserFoodContextType | undefined>(
  undefined
)

export const useUserFood = () => {
  const context = useContext(UserFoodContext)

  if (!context) {
    throw new Error("useUserFood must be used within a UserFoodProvider")
  }

  return context
}
