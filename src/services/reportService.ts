import monAPI from "@/lib/monAPI"

import { CreateReportType, ReportType } from "@/schemas/reportSchema"

interface ReportResponse {
  reports: ReportType[]
  totalPages: number
  totalItems: number
}

export const getReportsByUserId = async (
  userId: string | undefined,
  page: number,
  limit?: number
): Promise<ReportResponse> => {
  try {
    const response = await monAPI.get(`/reports/user/${userId}`, {
      params: { page, limit }
    })

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    const { totalPages, totalItems, items: reports } = data
    return { reports, totalPages, totalItems }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getReportByBookingId = async (
  bookingId: string | undefined
): Promise<ReportType[]> => {
  try {
    const response = await monAPI.get(`/reports/booking/${bookingId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as ReportType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const createReport = async (
  newData: CreateReportType,
  showModal: (message: string) => void
): Promise<string> => {
  try {
    const response = await monAPI.post("/reports", newData)
    const { success, message } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    showModal(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
