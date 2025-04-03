import axios from "axios"

import monAPI from "@/lib/monAPI"

import { BookingType, CreateBookingType } from "@/schemas/bookingSchema"

export const getBookingsByUserId = async (
  userId: string | undefined
): Promise<BookingType[]> => {
  try {
    const response = await monAPI.get(`/bookings/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as BookingType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách lịch hẹn của người dùng"
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

export const getBookingsByConsultantId = async (
  consultantId: string | undefined,
  date?: string
): Promise<BookingType[]> => {
  try {
    const response = await monAPI.get(`/bookings/consultant/${consultantId}`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (success) {
      return data as BookingType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách lịch hẹn của chuyên viên"
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

export const getBookingById = async (
  bookingId: string | undefined
): Promise<BookingType> => {
  try {
    const response = await monAPI.get(`/bookings/${bookingId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as BookingType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin chi tiết lịch hẹn"
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

export const createBooking = async (
  newData: CreateBookingType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/bookings`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Tạo lịch hẹn mới thất bại")

      throw {
        isCustomError: true,
        message: message || "Không thể tạo lịch hẹn mới"
      }
    }

    showModal(message || "Tạo lịch hẹn mới thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi tạo lịch hẹn")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
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
      showModal(message || "Cập nhật trạng thái lịch hẹn thất bại")

      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật trạng thái lịch hẹn"
      }
    }

    showModal(message || "Cập nhật trạng thái lịch hẹn thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật trạng thái lịch hẹn")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
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
      showModal(message || "Hủy lịch hẹn thất bại")

      throw {
        isCustomError: true,
        message: message || "Không thể hủy lịch hẹn"
      }
    }

    showModal(message || "Hủy lịch hẹn thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi hủy lịch hẹn")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
