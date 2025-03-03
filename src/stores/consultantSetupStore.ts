import { create } from "zustand"

interface ImageType {
  uri: string
  fileName: string
  uploading: boolean
  deleting?: boolean
  progress: number
}

interface setupConsultantStoreProps {
  bio: string
  experience: number
  expertise: string
  certificate: string
  issueDate: string
  expiryDate: string
  images: ImageType[]
  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useConsultantSetupStore = create<setupConsultantStoreProps>(
  (set) => ({
    bio: "Halo",
    experience: 5,
    expertise: "",
    certificate: "",
    issueDate: "",
    expiryDate: "",
    images: [],

    updateField: (key, value, append = false) =>
      set((state) => {
        if (
          append &&
          Array.isArray(state[key as keyof setupConsultantStoreProps])
        ) {
          return {
            ...state,
            [key]: [
              ...(state[key as keyof setupConsultantStoreProps] as any[]),
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
        images: []
      })
  })
)
