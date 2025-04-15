import monAPI from "@/lib/monAPI"

import { UserSubscriptionType } from "@/schemas/subscriptionSchema"

export const getUserSubscriptionByUserId = async (
  userId: string | undefined
): Promise<UserSubscriptionType[]> => {
  try {
    const response = await monAPI.get(`/user-subscriptions/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as UserSubscriptionType[]
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getRemainingBookingsByUserId = async (
  userId: string | undefined
): Promise<number> => {
  try {
    const response = await monAPI.get(
      `/user-subscriptions/${userId}/remaining-bookings`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data.remainingBookings as number
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
