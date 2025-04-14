import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateUpdateMetricType, MetricType } from "@/schemas/metricSchema"

export const getMetricsByUserId = async (
  userId: string | undefined
): Promise<MetricType[]> => {
  try {
    const response = await monAPI.get(`/metrics/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as MetricType[]
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách thông tin sức khỏe"
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

export const createMetric = async (
  newData: CreateUpdateMetricType,
  showModal?: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/metrics`, newData)

    const { success, message } = response.data

    if (!success) {
      if (showModal)
        showModal(message || "Không thể tạo thông tin sức khỏe mới")

      throw {
        isCustomError: true,
        message: message || "Không thể tạo thông tin sức khỏe mới"
      }
    }

    if (showModal) showModal("Cập nhật thông tin sức khỏe thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (showModal) showModal("Đã xảy ra lỗi khi tạo thông tin sức khỏe")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      if (showModal) showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}

export const updateMetric = async (
  newData: CreateUpdateMetricType,
  showModal?: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post(`/metrics/update`, newData)

    const { success, message } = response.data

    if (!success) {
      if (showModal)
        showModal(message || "Không thể cập nhật thông tin sức khỏe mới")

      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật thông tin sức khỏe mới"
      }
    }

    if (showModal) showModal("Cập nhật thông tin sức khỏe thành công")

    console.log(message)
    return message
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (showModal) showModal("Đã xảy ra lỗi khi cập nhật thông tin sức khỏe")

      console.log("Lỗi từ server:", error.response?.data || error.message)
      throw error
    } else {
      if (showModal) showModal("Đã xảy ra lỗi không mong muốn")

      console.log("Lỗi không phải Axios:", error)
      throw {
        isCustomError: true,
        message: "Đã xảy ra lỗi không mong muốn"
      }
    }
  }
}
