import { create } from "zustand"

import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"

import { CreateWorkoutExerciseType } from "@/schemas/workoutSchema"

interface workoutStoreProps {
  category: string
  name: string
  description: string
  difficultyLevel: DifficultyLevelEnum
  isPublic: boolean
  exercises: CreateWorkoutExerciseType[]
  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useCreateWorkoutStore = create<workoutStoreProps>((set) => ({
  category: "",
  name: "",
  description: "",
  difficultyLevel: DifficultyLevelEnum.Easy,
  isPublic: false,
  exercises: [],

  updateField: (key, value, append = false) =>
    set((state) => {
      if (key === "exercises") {
        if (append) {
          return {
            ...state,
            exercises: [
              ...state.exercises,
              ...(Array.isArray(value) ? value : [value])
            ]
          }
        } else {
          return {
            ...state,
            exercises: value
          }
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
      exercises: []
    })
}))
