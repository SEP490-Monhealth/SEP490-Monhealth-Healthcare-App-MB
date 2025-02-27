import { create } from "zustand"

interface Store {
  dateToSend: Date
  setDateToSend: (date: Date) => void
}

export const dateStore = create<Store>((set) => ({
  dateToSend: new Date(),
  setDateToSend: (date) => set({ dateToSend: date })
}))
