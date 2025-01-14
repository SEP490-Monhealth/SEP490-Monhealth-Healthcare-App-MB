import { create } from "zustand"

import { NutritionType } from "@/schemas/nutritionSchema"
import { PortionType } from "@/schemas/portionSchema"

interface CreateFoodState {
  foodType: string
  mealType: string[]
  dishType: string
  name: string
  description: string
  portion: PortionType
  nutrition?: NutritionType
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useFoodStore = create<CreateFoodState>((set) => ({
  foodType: "User",
  mealType: [],
  dishType: "",
  name: "",
  description: "",
  portion: {
    size: "",
    weight: 1,
    unit: ""
  },
  nutrition: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0
  },
  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),
  reset: () =>
    set(() => ({
      foodType: "User",
      mealType: [],
      dishType: "",
      name: "",
      description: "",
      portion: {
        size: "",
        weight: 0,
        unit: ""
      },
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        sugar: 0
      }
    }))
}))
