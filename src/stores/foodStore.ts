import { create } from "zustand"

import { NutritionType } from "@/schemas/nutritionSchema"
import { PortionType } from "@/schemas/portionSchema"

interface CreateFoodState {
  type: string
  name: string
  description: string
  portion: PortionType
  nutrition?: NutritionType
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useFoodStore = create<CreateFoodState>((set) => ({
  type: "User",
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
      type: "User",
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
