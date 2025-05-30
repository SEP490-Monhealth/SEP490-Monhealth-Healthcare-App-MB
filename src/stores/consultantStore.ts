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
  expiryDate: string | null
  issuedBy: string
  imageUrls: ImageType[]
  // meetUrl: string

  updateField: (field: string, value: any, append?: boolean) => void
  reset: () => void
}

export const useConsultantStore = create<ConsultantStoreState>((set) => ({
  // bio: "Tôi là vi khuẩn tôi có kinh nghiệm quen 8 người cùng 1 lúc nhưng tất cả chỉ là hẹn hò thôi vì tôi với bọn họ vẫn chưa chính thức yêu nhau",
  // experience: 5,
  // expertise: "Dinh dưỡng",
  // number: "CERT-2025-002",
  // certificate: "Chứng chỉ chuyên môn về Dinh dưỡng",
  // issueDate: "2021-01-01",
  // expiryDate: "2024-01-01",
  // issuedBy: "Trường Đại học Y Dược TP.HCM",
  // imageUrls: [],

  bio: "",
  experience: 0,
  expertise: "",
  number: "",
  certificate: "",
  // issueDate: new Date().toISOString().split("T")[0],
  issueDate: "",
  expiryDate: "",
  issuedBy: "",
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
      // meetUrl: ""
    })
}))
