import { create } from "zustand"

interface setupStoreProps {
  dateOfBirth: string
  gender: string
  height: number
  weight: number
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
  goalType: string
  weightGoal: number
  categories: string[]
  allergies: string[]
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useSetupStore = create<setupStoreProps>((set) => ({
  // dateOfBirth: "2003-08-27T00:00:00.000Z",
  // gender: "Male",
  // height: 170,
  // weight: 50,
  // activityLevel: 1.375,
  // goalType: "WeightGain",
  // weightGoal: 66,
  // categories: [],
  // allergies: [],

  dateOfBirth: "",
  gender: "Male",
  height: 0,
  weight: 0,
  activityLevel: 1.2,
  goalType: "",
  weightGoal: 0,
  categories: [],
  allergies: [],

  updateField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value
    })),

  reset: () =>
    set({
      dateOfBirth: "",
      gender: "Male",
      height: 0,
      weight: 0,
      activityLevel: 1.2,
      goalType: "",
      weightGoal: 0,
      categories: [],
      allergies: []
    })
}))
