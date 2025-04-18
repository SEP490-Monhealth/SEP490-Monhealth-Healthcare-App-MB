import monAPI from "@/lib/monAPI"

import {
  GoalType,
  NutritionGoalType,
  WaterIntakeGoalType,
  WeightGoalType
} from "@/schemas/goalSchema"

export const getGoalsByUserId = async (
  userId: string | undefined
): Promise<GoalType[]> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as GoalType[]
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getWeightGoalByUserId = async (
  userId: string | undefined
): Promise<WeightGoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/weight`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WeightGoalType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getNutritionGoalByUserId = async (
  userId: string | undefined
): Promise<NutritionGoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/nutrition`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as NutritionGoalType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getWaterIntakeGoalByUserId = async (
  userId: string | undefined
): Promise<WaterIntakeGoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/water-intake`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as WaterIntakeGoalType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}

export const getWorkoutGoalByUserId = async (
  userId: string | undefined
): Promise<GoalType> => {
  try {
    const response = await monAPI.get(`/goals/user/${userId}/workout`)

    const { success, message, data } = response.data

    if (!success) {
      throw { isCustomError: true, message: message }
    }

    return data as GoalType
  } catch (error: any) {
    const errorMessage = error.response?.data?.message
    throw { isCustomError: true, message: errorMessage }
  }
}
