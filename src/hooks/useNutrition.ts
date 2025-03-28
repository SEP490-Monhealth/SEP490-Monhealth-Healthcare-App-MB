import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { NutritionType } from "@/schemas/nutritionSchema"

import { getNutritionByFoodId } from "@/services/nutritionService"

export const useGetNutritionByFoodId = (foodId: string) => {
  const handleError = useError()

  return useQuery<NutritionType, Error>({
    queryKey: ["nutrition", foodId],
    queryFn: async () => {
      try {
        return await getNutritionByFoodId(foodId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
