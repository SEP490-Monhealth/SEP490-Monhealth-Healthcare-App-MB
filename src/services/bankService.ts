import axios from "axios"

import monAPI from "@/lib/monAPI"

import { BankType } from "@/schemas/bankSchema"

interface BankResponse {
  banks: BankType[]
  totalPages: number
  totalItems: number
}

export const getAllBanks = async (
  page: number,
  limit?: number,
  search?: string,
  status?: boolean
): Promise<BankResponse> => {
  try {
    const response = await monAPI.get(`/banks`, {
      params: { page, limit, search, status }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách ngân hàng"
      }
    }

    const { totalPages, totalItems, items: banks } = data
    return { banks, totalPages, totalItems }
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

export const getBankById = async (
  bankId: string | undefined
): Promise<BankType> => {
  try {
    const response = await monAPI.get(`/banks/${bankId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin ngân hàng"
      }
    }

    return data as BankType
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
