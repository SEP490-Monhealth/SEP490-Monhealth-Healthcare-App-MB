import { create } from "zustand"

interface setupConsultantStoreProps {
  fullName: string
  phoneNumber: string
  email: string
  password: string
  certificateName: string
  issueDate: string
  expiryDate: string
  images: string[]
  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useConsultantSetupStore = create<setupConsultantStoreProps>(
  (set) => ({
    fullName: "Van Huu Toan",
    phoneNumber: "0792766979",
    email: "toanvhse171981@fpt.edu.vn",
    password: "123As@",
    certificateName: "",
    issueDate: "",
    expiryDate: "",
    images: [],

    updateField: (key, value) =>
      set((state) => ({
        ...state,
        [key]: value
      })),

    reset: () =>
      set({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        certificateName: "",
        issueDate: "",
        expiryDate: "",
        images: []
      })
  })
)
