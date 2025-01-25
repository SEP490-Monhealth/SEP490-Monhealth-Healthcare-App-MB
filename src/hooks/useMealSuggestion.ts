import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import {
  MealSuggestionType,
  getMealsByUserId
} from "@/services/mealSuggestionService"

export const useGetMealsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<MealSuggestionType, Error>({
    queryKey: ["meals", userId],
    queryFn: async () => {
      try {
        return await getMealsByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
