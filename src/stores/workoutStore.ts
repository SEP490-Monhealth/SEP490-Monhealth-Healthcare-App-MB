import { create } from "zustand"

import { DifficultyLevelEnum } from "@/constants/enum/DifficultyLevel"

interface CreateWorkoutExerciseItemsType {
  exerciseId: string
  duration: number | null
  reps: number | null
}

interface WorkoutStoreState {
  category: string
  name: string
  description: string
  difficultyLevel: DifficultyLevelEnum | undefined
  exercises: CreateWorkoutExerciseItemsType[]
  isPublic: boolean

  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useWorkoutStore = create<WorkoutStoreState>((set) => ({
  category: "123",
  name: "toan",
  description: "ad",
  difficultyLevel: undefined,
  exercises: [],
  isPublic: false,

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
      difficultyLevel: undefined,
      exercises: [],
      isPublic: false
    })
}))

interface ExerciseItemsType {
  exerciseId: string
  exerciseType: string
}

interface exerciseItemsStoreProps {
  exercisesSelected: ExerciseItemsType[]

  updateType: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useExerciseItemsStore = create<exerciseItemsStoreProps>((set) => ({
  exercisesSelected: [],

  updateType: (key, value, append = false) =>
    set((state) => {
      if (key === "exercisesSelected") {
        const updatedExercisesSelected = append
          ? state.exercisesSelected.map((exercise) =>
              exercise.exerciseId === value.exerciseId
                ? { ...exercise, exerciseType: value.exerciseType }
                : exercise
            )
          : value

        if (
          append &&
          !state.exercisesSelected.some(
            (exercise) => exercise.exerciseId === value.exerciseId
          )
        ) {
          return {
            ...state,
            exercisesSelected: [...state.exercisesSelected, value]
          }
        }

        return {
          ...state,
          exercisesSelected: updatedExercisesSelected
        }
      }

      return { ...state, [key]: value }
    }),
  reset: () =>
    set({
      exercisesSelected: []
    })
}))
