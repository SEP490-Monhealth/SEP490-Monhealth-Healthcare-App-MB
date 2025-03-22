import { create } from "zustand"

import { GenderEnum } from "@/constants/enum/Gender"
import { GoalTypeEnum } from "@/constants/enum/Goal"

interface SetupStoreState {
  dateOfBirth: string
  gender: GenderEnum | undefined
  height: number | undefined
  weight: number | undefined
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
  weightGoal: number | undefined
  goalType: GoalTypeEnum | undefined
  caloriesRatio: number
  // categories: string[]
  allergies: string[]

  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useSetupStore = create<SetupStoreState>((set) => ({
  dateOfBirth: "2003-08-27T00:00:00.000Z",
  gender: GenderEnum.Male,
  height: 170,
  weight: 50,
  activityLevel: 1.375,
  weightGoal: 66,
  goalType: GoalTypeEnum.WeightGain,
  caloriesRatio: 1.2,

  // categories: [
  //   "Hải sản",
  //   "Thịt",
  //   "Rau củ",
  //   "Món ngọt",
  //   "Đồ uống",
  //   "Món lên men",
  //   "Trái cây"
  // ],

  allergies: ["Hải sản có vỏ", "Sữa", "Các loại hạt", "Đậu nành", "Hạt vừng"],

  // dateOfBirth: "",
  // gender: undefined,
  // height: undefined,
  // weight: undefined,
  // activityLevel: 1.2,
  // weightGoal: undefined,
  // goalType: undefined,
  // caloriesRatio: 1,
  // categories: [],
  // allergies: [],

  updateField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value
    })),

  reset: () =>
    set({
      dateOfBirth: "",
      gender: undefined,
      height: undefined,
      weight: undefined,
      activityLevel: 1.2,
      weightGoal: undefined,
      goalType: undefined,
      caloriesRatio: 1,
      // categories: [],
      allergies: []
    })
}))
