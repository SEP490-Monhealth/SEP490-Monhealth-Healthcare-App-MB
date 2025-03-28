import axios from "axios"

import monAPI from "@/lib/monAPI"

export const getRemainingBookingByUserId = async (
  userId: string | undefined
): Promise<number> => {
  try {
    const response = await monAPI.get(
      `/user-subscriptions/${userId}/remaining-booking`
    )

    const { success, message, data } = response.data

    if (success) {
      return data.remainingBookings
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách món ăn của người dùng"
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
