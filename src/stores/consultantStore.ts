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
  number: string
  certificate: string
  issueDate: string
  expiryDate: string
  issuedBy: string
  imageUrls: ImageType[]

  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useConsultantStore = create<ConsultantStoreState>((set) => ({
  bio: "Với kinh nghiệm hơn 2 năm trong lĩnh vực tư vấn tâm lý, tôi chuyên hỗ trợ những người gặp phải các triệu chứng trầm cảm, lo âu và căng thẳng kéo dài",
  experience: 2,
  expertise: "Trầm cảm",
  number: "CERT-2025-002",
  certificate: "Chứng chỉ chuyên môn về Trầm cảm",
  issueDate: "2021-01-01",
  expiryDate: "2024-01-01",
  issuedBy: "Hiệp hội tâm lý học Việt Nam",
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
      number: "",
      certificate: "",
      issueDate: "",
      expiryDate: "",
      issuedBy: "",
      imageUrls: []
    })
}))
