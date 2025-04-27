import monAPI from "@/lib/monAPI"

import {
  RemainingBookingsType,
  UserSubscriptionType
} from "@/schemas/subscriptionSchema"

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
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getRemainingBookingsByUserId = async (
  userId: string | undefined
): Promise<RemainingBookingsType> => {
  try {
    const response = await monAPI.get(
      `/user-subscriptions/${userId}/remaining-bookings`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
