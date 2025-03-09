import { create } from "zustand"

interface ImageType {
  uri: string
  fileName: string
  uploading: boolean
  deleting?: boolean
  progress: number
}

interface ConsultantStoreState {
  bio: string
  experience: number
  expertise: string
  certificate: string
  issueDate: string
  expiryDate: string
  imageUrls: ImageType[]

  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useConsultantStore = create<ConsultantStoreState>((set) => ({
  bio: "Halo",
  experience: 5,
  expertise: "",
  certificate: "",
  issueDate: "",
  expiryDate: "",
  imageUrls: [],

  updateField: (key, value, append = false) =>
    set((state) => {
      if (append && Array.isArray(state[key as keyof ConsultantStoreState])) {
        return {
          ...state,
          [key]: [
            ...(state[key as keyof ConsultantStoreState] as any[]),
            ...(Array.isArray(value) ? value : [value])
          ]
        }
      }
      return { ...state, [key]: value }
    }),

  reset: () =>
    set({
      bio: "",
      experience: 0,
      expertise: "",
      certificate: "",
      issueDate: "",
      expiryDate: "",
      imageUrls: []
    })
}))
