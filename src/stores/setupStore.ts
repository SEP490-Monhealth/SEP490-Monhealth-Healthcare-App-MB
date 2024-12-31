import { create } from "zustand"

interface SetupState {
  dateOfBirth: string
  gender: string
  height: number
  weight: number
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
  goal: string
  categories: string[]
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useSetupStore = create<SetupState>((set) => ({
  dateOfBirth: "",
  gender: "",
  height: 0,
  weight: 0,
  activityLevel: 1.2,
  goal: "",
  categories: [],

  updateField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value
    })),

  reset: () =>
    set({
      dateOfBirth: "",
      gender: "",
      height: 0,
      weight: 0,
      activityLevel: 1.2,
      goal: "",
      categories: []
    })
}))
