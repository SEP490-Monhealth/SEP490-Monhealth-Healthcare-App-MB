import { create } from "zustand"

interface CreateWithdrawalRequestState {
  consultantBankId: string
  accountNumber: string
  description: string
  amount: number

  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useWithdrawalRequestStore = create<CreateWithdrawalRequestState>(
  (set) => ({
    consultantBankId: "",
    accountNumber: "",
    description: "",
    amount: 0,

    updateField: (field, value) =>
      set((state) => ({
        ...state,
        [field]: value
      })),

    reset: () =>
      set(() => ({
        consultantBankId: "",
        accountNumber: "",
        description: "",
        amount: 0
      }))
  })
)
