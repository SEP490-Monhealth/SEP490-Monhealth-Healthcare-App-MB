import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateMessageType, MessageType } from "@/schemas/messageSchema"

interface MessageResponse {
  messages: MessageType[]
  totalPages: number
  totalItems: number
}

export const getMessagesByChatId = async (
  chatId: string | undefined,
  page: number,
  limit?: number
): Promise<MessageResponse> => {
  try {
    const response = await monAPI.get(`/messages/${chatId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể lấy danh sách tin nhắn của người dùng"
      }
    }

    const { totalPages, totalItems, items: messages } = data
    return { messages, totalPages, totalItems }
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

export const createMessage = async (
  newData: CreateMessageType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/messages`, newData)

    const { success, message, data } = response.data

    if (!success) {
      throw {
        isCustomError: true,
        message: message || "Không thể gửi tin nhắn"
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
