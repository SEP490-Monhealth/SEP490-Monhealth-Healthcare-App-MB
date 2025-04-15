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
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: banks } = data
    return { banks, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
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
      throw { isCustomError: true, message: message }
    }

    return data as BankType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
