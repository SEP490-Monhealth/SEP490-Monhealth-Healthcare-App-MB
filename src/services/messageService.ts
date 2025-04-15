import monAPI from "@/lib/monAPI"

import { CreateMessageType } from "@/schemas/messageSchema"

export const createMessage = async (
  newData: CreateMessageType
): Promise<string> => {
  try {
    const response = await monAPI.post(`/messages`, newData)

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
