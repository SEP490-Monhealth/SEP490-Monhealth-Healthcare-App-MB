import axios from "axios"

import monAPI from "@/lib/monAPI"

import { CreateUpdateMetricType, MetricType } from "@/schemas/metricSchema"

export const getMetricsByUserId = async (
  userId: string | undefined
): Promise<MetricType[]> => {
  try {
    const response = await monAPI.get(`/metrics/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as MetricType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
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
      if (showModal) showModal(message)
      throw { isCustomError: true, message: message }
    }

    if (showModal) showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    if (showModal) showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
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
      if (showModal) showModal(message)
      throw { isCustomError: true, message: message }
    }

    if (showModal) showModal(message)
    console.log(message)
    return message
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    if (showModal) showModal(errorMessage)
    throw { isCustomError: true, message: errorMessage }
  }
}
