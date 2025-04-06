import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  ConsultantType,
  CreateConsultantType,
  UpdateConsultantType
} from "@/schemas/consultantSchema"

interface ConsultantResponse {
  consultants: ConsultantType[]
  totalPages: number
  totalItems: number
}

export const getAllConsultants = async (
  page: number,
  limit?: number,
  expertise?: string,
  search?: string,
  verified?: boolean,
  popular?: boolean,
  status?: boolean
): Promise<ConsultantResponse> => {
  try {
    const response = await monAPI.get(`/consultants`, {
      params: { page, limit, expertise, search, verified, popular, status }
    })

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

export const getConsultantByUserId = async (
  userId: string | undefined
): Promise<ConsultantType> => {
  try {
    const response = await monAPI.get(`/consultants/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ConsultantType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin tư vấn viên"
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
  consultantId: string | undefined
): Promise<ConsultantType> => {
  try {
    const response = await monAPI.get(`/consultants/${consultantId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ConsultantType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết chuyên viên"
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
  newData: CreateConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/consultants`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Tạo tư vấn viên thất bại")

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

export const updateConsultant = async (
  consultantId: string,
  consultantData: UpdateConsultantType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/consultants/${consultantId}`,
      consultantData
    )

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Cập nhật thông tin chuyên viên thất bại")
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật thông tin chuyên viên"
      }
    }

    showModal(message || "Cập nhật thông tin chuyên viên thành công")

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
