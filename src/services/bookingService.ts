import monAPI from "@/lib/monAPI"

import { BookingType, CreateBookingType } from "@/schemas/bookingSchema"

interface BookingResponse {
  bookings: BookingType[]
  totalPages: number
  totalItems: number
}

export const getBookingsByUserId = async (
  userId: string | undefined
): Promise<BookingType[]> => {
  try {
    const response = await monAPI.get(`/bookings/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as BookingType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getBookingsByConsultantId = async (
  consultantId: string | undefined,
  date?: string
): Promise<BookingType[]> => {
  try {
    const response = await monAPI.get(`/bookings/consultant/${consultantId}`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as BookingType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getMonthlyBookingsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  month?: string
): Promise<BookingResponse> => {
  try {
    const response = await monAPI.get(
      `/bookings/monthly/consultant/${consultantId}`,
      { params: { page, limit, month } }
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: bookings } = data
    return { bookings, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getBookingsByUserIdAndConsultantId = async (
  userId: string | undefined,
  consultantId: string | undefined
): Promise<BookingType[]> => {
  try {
    const response = await monAPI.get(
      `/bookings/user/${userId}/consultant/${consultantId}`
    )

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as BookingType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getBookingById = async (
  bookingId: string | undefined
): Promise<BookingType> => {
  try {
    const response = await monAPI.get(`/bookings/${bookingId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as BookingType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createBooking = async (
  newData: CreateBookingType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/bookings`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const updateBookingStatus = async (
  bookingId: string | undefined,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.patch(`/bookings/${bookingId}/status`)

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}

export const cancelBooking = async (
  bookingId: string,
  cancellationReason: string,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/bookings/${bookingId}/cancel`, {
      cancellationReason: cancellationReason
    })

    const { success, message } = response.data

    if (!success) {
      showModal(message)
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
