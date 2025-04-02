import axios from "axios"

import monAPI from "@/lib/monAPI"

import { ChatType } from "@/schemas/chatSchema"

export const getChatsByUserId = async (userId: string | undefined) => {
  try {
    const response = await monAPI.get(`/chats/user/${userId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ChatType[]
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

export const getChatsByConsultantId = async (
  consultantId: string | undefined
) => {
  try {
    const response = await monAPI.get(`/chats/consultant/${consultantId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ChatType[]
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

export const getChatById = async (chatId: string | undefined) => {
  try {
    const response = await monAPI.get(`/chats/${chatId}`)

    const { success, message, data } = response.data

    if (success) {
      return data as ChatType
    } else {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy thông tin lịch hẹn"
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
