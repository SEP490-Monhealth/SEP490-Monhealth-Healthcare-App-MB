import { create } from "zustand"

interface CreateBankState {
  bankId: string
  number: string
  name: string
  isDefault: boolean

  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useBankStore = create<CreateBankState>((set) => ({
  bankId: "",
  number: "",
  name: "",
  isDefault: false,

  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),

  reset: () =>
    set(() => ({
      bankId: "",
      number: "",
      name: "",
      isDefault: false
    }))
}))
