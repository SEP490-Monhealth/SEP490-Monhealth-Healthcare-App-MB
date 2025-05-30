import { create } from "zustand"

import { NutritionType } from "@/schemas/nutritionSchema"
import { PortionType } from "@/schemas/portionSchema"

interface CreateFoodState {
  // mealType: MealTypeEnum[]
  // dishType: DishTypeEnum[]
  name: string
  description: string
  referenceUrl: string
  portion: PortionType
  nutrition: NutritionType
  isPublic: boolean

  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useFoodStore = create<CreateFoodState>((set) => ({
  // mealType: [],
  // dishType: [],
  name: "",
  description: "",
  referenceUrl: "",
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
  isPublic: false,

  // updateField: (field, value) =>
  //   set((state) => ({
  //     ...state,
  //     [field]: Array.isArray(value)
  //       ? value.map((v) => v as MealTypeEnum | DishTypeEnum)
  //       : value
  //   })),

  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),

  reset: () =>
    set(() => ({
      // mealType: [],
      // dishType: [],
      name: "",
      description: "",
      referenceUrl: "",
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
      },
      isPublic: false
    }))
}))
