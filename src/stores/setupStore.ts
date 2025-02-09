import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"

import { Gender, GoalType } from "@/constants/enums"

interface setupStoreProps {
  dateOfBirth: string
  gender: Gender | undefined
  height: number | undefined
  weight: number | undefined
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725 | 1.9
  goalType: GoalType | undefined
  weightGoal: number | undefined
  caloriesRatio: number
  categories: string[]
  allergies: string[]

  newMetricData?: Record<string, any>
  newUserFoodsData?: Record<string, any>

  updateField: (field: string, value: any) => void

  setMetricData: (data: Record<string, any>) => void
  setUserFoodsData: (data: Record<string, any>) => void
  saveUserFoodsDataStorage: (data: Record<string, any>) => Promise<void>

  reset: () => void
}

export const useSetupStore = create<setupStoreProps>((set) => ({
  dateOfBirth: "2003-08-27T00:00:00.000Z",
  gender: Gender.Male,
  height: 170,
  weight: 50,
  activityLevel: 1.375,
  goalType: GoalType.WeightGain,
  weightGoal: 66,
  caloriesRatio: 1,
  categories: [
    "Hải sản",
    "Thịt",
    "Rau củ",
    "Món ngọt",
    "Đồ uống",
    "Món lên men",
    "Trái cây",
    "Đồ ăn nhanh",
    "Bánh các loại",
    "Đồ ăn vặt"
  ],
  allergies: ["Sữa bò", "Hạt cây", "Đậu nành", "Động vật có vỏ"],

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

  saveUserFoodsDataStorage: async (data) => {
    await AsyncStorage.setItem("User Foods Data", JSON.stringify(data))
  },

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
      categories: [],
      allergies: []
    })
}))
