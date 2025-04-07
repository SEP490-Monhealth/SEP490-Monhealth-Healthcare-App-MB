import axios from "axios"

import { TimeSlot } from "@/components/local/schedules/TimeSlotSelector"

import monAPI from "@/lib/monAPI"

import { CreateScheduleType, ScheduleType } from "@/schemas/scheduleSchema"

export const getAllScheduleTimeSlots = async (): Promise<TimeSlot[]> => {
  try {
    const response = await monAPI.get("/schedules/time-slots")

    const { success, message, data } = response.data

    if (success) {
      return data as TimeSlot[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách thời gian hẹn"
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

export const getSchedulesByConsultantId = async (
  consultantId: string | undefined,
  date?: string
): Promise<ScheduleType[]> => {
  try {
    const response = await monAPI.get(`/schedules/consultant/${consultantId}`, {
      params: { date }
    })

    const { success, message, data } = response.data

    if (success) {
      return data as ScheduleType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách lịch hẹn"
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

export const createSchedule = async (
  newData: CreateScheduleType,
  showModal: (message: string) => void
) => {
  try {
    const response = await monAPI.post(`/schedules`, newData)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Không thể tạo lịch hẹn mới")

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

export const updateSchedule = async (
  scheduleId: string | undefined,
  newScheduleData: CreateScheduleType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/schedules/${scheduleId}`,
      newScheduleData
    )

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Không thể cập nhật lịch hẹn")

      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật lịch hẹn"
      }
    }

    showModal(message || "Cập nhật lịch hẹn thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi cập nhật lịch hẹn")

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

export const deleteSchedule = async (
  scheduleId: string | undefined,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.delete(`/schedules/${scheduleId}`)

    const { success, message } = response.data

    if (!success) {
      showModal(message || "Không thể xóa lịch hẹn")

      throw {
        isCustomError: true,
        message: message || "Không thể xóa lịch hẹn"
      }
    }

    showModal(message || "Xóa lịch hẹn thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      showModal("Đã xảy ra lỗi khi xóa lịch hẹn")

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

export const updateScheduleStatus = async (
  scheduleId: string | undefined,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/schedules/${scheduleId}/status`)

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
