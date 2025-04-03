import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  ConsultantBankType,
  CreateConsultantBankType,
  UpdateConsultantBankType
} from "@/schemas/consultantBankSchema"

export const getConsultantBanksByConsultantId = async (
  consultantId: string | undefined
): Promise<any[]> => {
  try {
    const response = await monAPI.get(
      `/consultant-banks/consultant/${consultantId}`
    )

    const { success, message, data } = response.data

    if (success) {
      return data as any[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách ngân hàng của chuyên viên"
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

export const getConsultantBankById = async (
  consultantBankId: string | undefined
): Promise<ConsultantBankType> => {
  try {
    const response = await monAPI.get(`/consultant-banks/${consultantBankId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ConsultantBankType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết ngân hàng"
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

export const createConsultantBank = async (
  newData: CreateConsultantBankType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/consultant-banks`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo ngân hàng mới"
      }
    }

    showModal(message || "Tạo ngân hàng thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error.response?.data || {
        message: "Đã xảy ra lỗi khi tạo ngân hàng"
      }

      showModal(serverError.message || "Đã xảy ra lỗi khi tạo ngân hàng")

      console.log("Lỗi từ server:", serverError)
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

export const updateConsultantBank = async (
  consultantBankId: string | undefined,
  consultantBankData: UpdateConsultantBankType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/consultant-banks/${consultantBankId}`,
      consultantBankData
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật ngân hàng"
      }
    }

    showModal(message || "Cập nhật ngân hàng thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật ngân hàng")

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

export const deleteConsultantBank = async (
  consultantBankId: string
): Promise<string> => {
  try {
    const response = await monAPI.delete(
      `/consultant-banks/${consultantBankId}`
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể xóa ngân hàng"
      }
    }

    console.log(message)
    return message
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

export const updateConsultantBankDefault = async (
  consultantBankId: string
): Promise<string> => {
  try {
    const response = await monAPI.patch(
      `/consultant-banks/${consultantBankId}/default`
    )

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật trạng thái"
      }
    }

    console.log(message)
    return message
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
