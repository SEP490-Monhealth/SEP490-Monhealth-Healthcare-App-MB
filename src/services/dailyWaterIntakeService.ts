import axios from "axios"

import monAPI from "@/lib/monAPI"

import { DailyWaterIntakeType } from "@/schemas/dailyWaterIntakeSchema"

export const getDailyWaterIntakesByUserId = async (
  userId: string | undefined,
  date: string
): Promise<DailyWaterIntakeType> => {
  try {
    const response = await monAPI.get(`/daily-water-intakes/user`, {
      params: { userId, date }
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
      return data as DailyWaterIntakeType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách nước uống"
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
