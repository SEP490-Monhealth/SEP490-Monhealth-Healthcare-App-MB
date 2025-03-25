import { create } from "zustand"

interface BookingStore {
  consultantId: string
  date: string
  notes: string

  updateField: (field: string, value: any) => void
  reset: () => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  consultantId: "",
  date: "",
  notes: "",

  updateField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value
    })),

  reset: () =>
    set(() => ({
      consultantId: "",
      date: "",
      notes: ""
    }))
}))
