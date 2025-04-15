import monAPI from "@/lib/monAPI"

import {
  ChatType,
  CreateChatMonAIType,
  CreateChatType
} from "@/schemas/chatSchema"

interface ChatResponse {
  chats: ChatType[]
  totalPages: number
  totalItems: number
}

export const getChatsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<ChatResponse> => {
  try {
    const response = await monAPI.get(`/chats/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: chats } = data
    return { chats, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getChatsByConsultantId = async (
  consultantId: string | undefined,
  page: number,
  limit?: number
): Promise<ChatResponse> => {
  try {
    const response = await monAPI.get(`/chats/consultant/${consultantId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: chats } = data
    return { chats, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const getChatById = async (chatId: string | undefined) => {
  try {
    const response = await monAPI.get(`/chats/${chatId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ChatType
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const createChat = async (
  newData: CreateChatType
): Promise<{ message: string; data: { chatId: string } }> => {
  try {
    const response = await monAPI.post(`/chats`, newData)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return { message, data }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const createChatMonAI = async (
  newData: CreateChatMonAIType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/chats/mon-ai`, newData)

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    console.log(message)
    return message
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
