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
  } catch (error) {
    console.error("Lỗi lấy danh sách ngân hàng", error)
    throw new Error("Lấy danh sách ngân hàng thất bại")
  }
}
