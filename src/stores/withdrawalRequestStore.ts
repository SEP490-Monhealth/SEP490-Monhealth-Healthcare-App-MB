import { create } from "zustand"

interface CreateWithdrawalRequestState {
  consultantBankId: string
  accountNumber: string
  description: string
  amount: number

  name: string
  shortName: string
  logoUrl: string

  updateField: (field: string, value: any) => void
  resetWithdrawalRequest: () => void
}

export const useWithdrawalRequestStore = create<CreateWithdrawalRequestState>(
  (set) => ({
    consultantBankId: "",
    accountNumber: "",
    description: "",
    amount: 0,

    name: "",
    shortName: "",
    logoUrl: "",

    updateField: (field, value) =>
      set((state) => ({
        ...state,
        [field]: value
      })),

    resetWithdrawalRequest: () =>
      set(() => ({
        consultantBankId: "",
        accountNumber: "",
        description: "",
        amount: 0,

        name: "",
        shortName: "",
        logoUrl: ""
      }))
  })
)
