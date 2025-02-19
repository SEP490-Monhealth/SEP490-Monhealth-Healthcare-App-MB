import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  ConsultantType,
  CreateConsultantType,
  UpdateBioConsultantType
} from "@/schemas/consultantSchema"

interface ConsultantResponse {
  consultants: ConsultantType[]
  totalPages: number
  totalItems: number
}

export const getAllConsultants = async (
  page: number,
  limit?: number,
  search?: string,
  popular?: boolean,
  status?: boolean
): Promise<ConsultantResponse> => {
  try {
    const response = await monAPI.get(`/consultants`, {
      params: { page, limit, search, popular, status }
    })

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: consultants } = data
      return { consultants, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách tư vấn viên"
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getConsultantsByExpertise = async (
  expertise: string,
  page: number,
  limit: number
): Promise<ConsultantResponse> => {
  try {
    const response = await monAPI.get(`/consultants/expertise/${expertise}`, {
      params: { page, limit }
    })

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: consultants } = data
      return { consultants, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message:
          message || "Không thể lấy danh sách tư vấn viên theo chuyên ngành"
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const getConsultantById = async (
  consultantId: string
): Promise<ConsultantType> => {
  try {
    const response = await monAPI.get(`/consultants/${consultantId}`)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message, data } = response.data

    if (success) {
      return data as ConsultantType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết tư vấn viên"
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const createConsultant = async (
  newConsultant: CreateConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/consultants`, newConsultant)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo tư vấn viên"
      }
    }

    showModal(message || "Tạo tư vấn viên thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo tư vấn viên")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const updateBioConsultant = async (
  consultantId: string,
  newBio: UpdateBioConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/consultants/${consultantId}`, newBio)

    if (!response || !response.data) {
      throw {
        isCustomError: true,
        message:
          "Không nhận được phản hồi từ máy chủ. Có thể máy chủ đang gặp sự cố hoặc kết nối mạng của bạn bị gián đoạn"
      }
    }

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật thông tin mô tả"
      }
    }

    showModal(message || "Cập nhật mô tả thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật mô tả")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
