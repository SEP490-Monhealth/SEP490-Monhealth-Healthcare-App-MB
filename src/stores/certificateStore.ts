import { create } from "zustand"

interface ImageType {
  uri: string
  fileName: string
  uploading: boolean
  deleting?: boolean
  progress: number
}

interface CertificateStoreState {
  imageUrls: ImageType[]

  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useCertificateStore = create<CertificateStoreState>((set) => ({
  imageUrls: [],

  updateField: (key, value, append = false) =>
    set((state) => {
      if (append && Array.isArray(state[key as keyof CertificateStoreState])) {
        return {
          ...state,
          [key]: [
            ...(state[key as keyof CertificateStoreState] as any[]),
            ...(Array.isArray(value) ? value : [value])
          ]
        }
      }
      return { ...state, [key]: value }
    }),

  reset: () =>
    set({
      imageUrls: []
    })
}))
