import { create } from "zustand"

interface SetupState {
  dateOfBirth: string | null
  gender?: string
  height?: number
  weight: number | null
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useSetupStore = create<SetupState>((set) => ({
  dateOfBirth: null,
  gender: undefined,
  height: undefined,
  weight: null,
  activityLevel: 1.2,

  updateField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value
    })),

  reset: () =>
    set({
      dateOfBirth: null,
      gender: undefined,
      height: undefined,
      weight: null,
      activityLevel: 1.2
    })
}))
