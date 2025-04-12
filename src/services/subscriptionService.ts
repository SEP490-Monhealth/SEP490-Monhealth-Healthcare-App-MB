import axios from "axios"

import monAPI from "@/lib/monAPI"

import { SubscriptionType } from "@/schemas/subscriptionSchema"

interface SubscriptionsResponse {
  totalPages: number
  totalItems: number
  subscriptions: SubscriptionType[]
}

export const getAllSubscriptions = async (
  page: number,
  limit?: number,
  search?: string,
  sort?: boolean,
  status?: boolean
): Promise<SubscriptionsResponse> => {
  try {
    const response = await monAPI.get(`/subscriptions`, {
      params: { page, limit, search, sort, status }
    })

    const { success, message, data } = response.data

    if (success) {
      const { totalPages, totalItems, items: subscriptions } = data
      return { subscriptions, totalPages, totalItems }
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách gói thành viên"
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
