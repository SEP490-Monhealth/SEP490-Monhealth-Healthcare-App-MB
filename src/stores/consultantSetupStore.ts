import { create } from "zustand"

interface ImageType {
  uri: string
  fileName: string
  uploading: boolean
  deleting?: boolean
  progress: number
}

interface setupConsultantStoreProps {
  expertise: string
  name: string
  issueDate: string
  expiryDate: string
  images: ImageType[]
  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useConsultantSetupStore = create<setupConsultantStoreProps>(
  (set) => ({
    expertise: "",
    name: "",
    issueDate: "",
    expiryDate: "",
    images: [],

    updateField: (key, value, append = false) =>
      set((state) => {
        if (key === "images") {
          const updatedArray = append
            ? [...state[key], ...value].filter((img) => img && img.uri)
            : value.filter((img: ImageType) => img && img.uri)

          return {
            ...state,
            [key]: updatedArray
          }
        }

        return {
          ...state,
          [key]: value
        }
      }),

    reset: () =>
      set({
        expertise: "",
        name: "",
        issueDate: "",
        expiryDate: "",
        images: []
      })
  })
)
