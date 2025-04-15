import monAPI from "@/lib/monAPI"

import { ExpertiseType, ExpertiseUpdateType } from "@/schemas/expertiseSchema"

interface ExpertiseResponse {
  expertise: ExpertiseType[]
  totalPages: number
  totalItems: number
}

export const getAllExpertise = async (
  page: number,
  limit?: number
): Promise<ExpertiseResponse> => {
  try {
    const response = await monAPI.get(`/expertise`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: expertise } = data
    return { expertise, totalPages, totalItems }
  } catch (error: any) {
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}

export const updateExpertise = async (
  consultantId: string | undefined,
  certificateData: ExpertiseUpdateType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.put(
      `/expertise/consultant/${consultantId}`,
      certificateData
    )

    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    showModal(error.message)
    throw {
      isCustomError: true,
      message: error.message || "Đã xảy ra lỗi không mong muốn"
    }
  }
}
