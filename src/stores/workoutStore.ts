import { create } from "zustand"

import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"

interface CreateWorkoutExerciseItemsType {
  exerciseId: string
  duration: number | null
  reps: number | null
}

interface workoutStoreProps {
  category: string
  name: string
  description: string
  difficultyLevel: DifficultyLevelEnum
  isPublic: boolean
  exercises: CreateWorkoutExerciseItemsType[]
  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useCreateWorkoutStore = create<workoutStoreProps>((set) => ({
  category: "123",
  name: "khai",
  description: "ad",
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
              ...(Array.isArray(value) ? value : [value]) // Flatten value before appending
            ]
          }
        } else {
          return {
            ...state,
            exercises: value // Directly set the value if not appending
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
