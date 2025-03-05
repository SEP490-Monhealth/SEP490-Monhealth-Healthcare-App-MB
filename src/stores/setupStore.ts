import { create } from "zustand"

import { GenderEnum } from "@/constants/enum/Gender"
import { GoalTypeEnum } from "@/constants/enum/GoalType"

interface setupStoreProps {
  dateOfBirth: string
  gender: GenderEnum | undefined
  height: number | undefined
  weight: number | undefined
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
  goalType: GoalTypeEnum | undefined
  weightGoal: number | undefined
  caloriesRatio: number
  // categories: string[]
  allergies: string[]

  newMetricData?: Record<string, any>
  newUserFoodsData?: Record<string, any>

  updateField: (field: string, value: any) => void

  setMetricData: (data: Record<string, any>) => void
  setUserFoodsData: (data: Record<string, any>) => void

  reset: () => void
}

export const useSetupStore = create<setupStoreProps>((set) => ({
  dateOfBirth: "2003-08-27T00:00:00.000Z",
  gender: GenderEnum.Male,
  height: 170,
  weight: 50,
  activityLevel: 1.375,
  goalType: GoalTypeEnum.WeightGain,
  weightGoal: 66,
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
  // goalType: undefined,
  // weightGoal: undefined,
  // caloriesRatio: 1,
  // categories: [],
  // allergies: [],

  newMetricData: undefined,
  newUserFoodsData: undefined,

  updateField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value
    })),

  setMetricData: (data) =>
    set(() => ({
      newMetricData: data
    })),

  setUserFoodsData: (data) =>
    set(() => ({
      newUserFoodsData: data
    })),

  reset: () =>
    set({
      dateOfBirth: "",
      gender: undefined,
      height: undefined,
      weight: undefined,
      activityLevel: 1.2,
      goalType: undefined,
      weightGoal: undefined,
      caloriesRatio: 1,
      // categories: [],
      allergies: []
    })
}))
