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
  newData: CreateUpdateMetricType
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
