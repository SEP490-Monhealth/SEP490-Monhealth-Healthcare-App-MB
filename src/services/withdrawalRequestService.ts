import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  CreateWithdrawalRequestType,
  WithdrawalRequestType
} from "@/schemas/withdrawalRequestSchema"

interface WithdrawalRequestResponse {
  withdrawalRequests: WithdrawalRequestType[]
  totalPages: number
  totalItems: number
}

export const getWithdrawalRequestsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<WithdrawalRequestResponse> => {
  try {
    const response = await monAPI.get(
      `/withdrawal-requests/consultant/${consultantId}`,
      {
        params: { consultantId, page, limit }
      }
    )

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: withdrawalRequests } = data
      return { withdrawalRequests, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách yêu cầu rút tiền"
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

export const createWithdrawalRequest = async (
  newData: CreateWithdrawalRequestType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/withdrawal-requests`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo yêu cầu rút tiền mới"
      }
    }

    showModal(message || "Tạo yêu cầu rút tiền mới thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo yêu cầu rút tiền")

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
