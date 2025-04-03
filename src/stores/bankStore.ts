import { create } from "zustand"

interface CreateBankState {
  bank: string
  number: string
  name: string
  isDefault: boolean

  updateField: (field: string, value: any) => void
  reset: () => void
  setBankFromSelectBank: () => void
}

interface SelectBankState {
  code: string
  name: string
  shortName: string
  logoUrl: string

  updateBank: (field: string, value: any) => void
  reset: () => void
}

export const useBankStore = create<CreateBankState>((set) => ({
  bank: "",
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
      bank: "",
      number: "",
      name: "",
      isDefault: false
    })),

  setBankFromSelectBank: () => {
    const selectBankState = useSelectBankStore.getState()
    set(() => ({
      bank: selectBankState.code
    }))
  }
}))

export const useSelectBankStore = create<SelectBankState>((set) => ({
  code: "",
  name: "",
  shortName: "",
  logoUrl: "",

  updateBank: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),

  reset: () =>
    set(() => ({
      code: "",
      shortName: "",
      logoUrl: ""
    }))
}))
