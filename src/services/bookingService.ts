import monAPI from "@/lib/monAPI"

import {
  BookingType,
  CreateBookingType,
  UpdateBookingType
} from "@/schemas/bookingSchema"

interface BookingResponse {
  bookings: BookingType[]
  totalPages: number
  totalItems: number
}

export const getBookingsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<BookingResponse> => {
  try {
    const response = await monAPI.get(`/bookings/user/${userId}`, {
      params: { page, limit }
    })

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

export const getBookingsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  date?: string
): Promise<BookingResponse> => {
  try {
    const response = await monAPI.get(`/bookings/consultant/${consultantId}`, {
      params: { page, limit, date }
    })

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

export const updateBooking = async (
  bookingId: string | undefined,
  updatedData: UpdateBookingType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/bookings/${bookingId}`, updatedData)
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

export const completeBooking = async (
  bookingId: string | undefined,
  evidenceUrls: string[],
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/bookings/${bookingId}/complete`, {
      evidenceUrls: evidenceUrls
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
