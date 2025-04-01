import axios from "axios"

import monAPI from "@/lib/monAPI"

import {
  CreateMetricType,
  MetricType,
  UpdateMetricType
} from "@/schemas/metricSchema"

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
  newData: CreateMetricType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/metrics`, newData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể tạo thông tin sức khỏe mới"
      }
    }

    console.log(message)
    return message
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

export const updateMetric = async (
  metricId: string,
  metricData: UpdateMetricType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(`/metrics/${metricId}`, metricData)

    const { success, message } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể cập nhật thông tin"
      }
    }

    showModal(message || "Cập nhật thông tin thành công")
    console.log(message)
    return message
  } catch (error: any) {
    let errorMessage = "Đã xảy ra lỗi không mong muốn"

    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message
      errorMessage = serverMessage || "Đã xảy ra lỗi khi cập nhật thông tin"
      console.log("Lỗi từ server:", error.response?.data || error.message)
    } else if (error.isCustomError) {
      errorMessage = error.message
    } else {
      console.log("Lỗi không phải Axios:", error)
    }

    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
