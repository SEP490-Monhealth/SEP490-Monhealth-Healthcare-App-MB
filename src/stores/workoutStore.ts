import { create } from "zustand"

import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"

import { CreateWorkoutExerciseType } from "@/schemas/workoutSchema"

interface workoutStoreProps {
  category: string
  name: string
  description: string
  difficultyLevel: DifficultyLevelEnum
  isPublic: boolean
  items: CreateWorkoutExerciseType[]
  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useCreateWorkoutStore = create<workoutStoreProps>((set) => ({
  category: "",
  name: "",
  description: "",
  difficultyLevel: DifficultyLevelEnum.Easy,
  isPublic: false,
  items: [],

  updateField: (key, value, append = false) =>
    set((state) => {
      if (append && Array.isArray(state[key as keyof workoutStoreProps])) {
        return {
          ...state,
          [key]: [
            ...(state[key as keyof workoutStoreProps] as any[]),
            ...(Array.isArray(value) ? value : [value])
          ]
        }
      }
      return { ...state, [key]: value }
    }),

  reset: () =>
    set({
      category: "",
      name: "",
      description: "",
      difficultyLevel: DifficultyLevelEnum.Easy,
      isPublic: false,
      items: []
    })
}))
