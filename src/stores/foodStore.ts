import { create } from "zustand"

import { NutritionType } from "@/schemas/nutritionSchema"
import { PortionType } from "@/schemas/portionSchema"

interface CreateFoodState {
  userId: string
  type: string
  name: string
  description: string
  portion: PortionType
  nutrition: NutritionType
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useFoodStore = create<CreateFoodState>((set) => ({
  userId: "1",
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
    fiber: 0,
    sugar: 0,
    fat: 0
  },
  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),
  reset: () =>
    set(() => ({
      userId: "1",
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
        fiber: 0,
        sugar: 0,
        fat: 0
      }
    }))
}))
