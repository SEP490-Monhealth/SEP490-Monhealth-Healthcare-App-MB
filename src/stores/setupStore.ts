import { create } from "zustand"

interface UserInfo {
  dateOfBirth: string
  gender: 0 | 1
  height: number
  weight: number
  activityLevel: 1.2 | 1.375 | 1.55 | 1.725
  bmi: number
  bmr: number
  tdee: number
  ibw: number
}

interface SetupStore {
  userInfo: UserInfo
  setUserInfo: (info: UserInfo) => void
  setGender: (gender: "Male" | "Female") => void
}

export const useSetupStore = create<SetupStore>((set) => ({
  userInfo: {
    gender: 0,
    dateOfBirth: "",
    height: 0,
    weight: 0,
    activityLevel: 1.2,
    bmi: 0,
    bmr: 0,
    tdee: 0,
    ibw: 0
  },
  setUserInfo: (info) => set({ userInfo: info }),
  setGender: (gender) => {
    const genderNumber = gender === "Male" ? 0 : 1
    set((state) => ({
      userInfo: { ...state.userInfo, gender: genderNumber }
    }))
  }
}))
