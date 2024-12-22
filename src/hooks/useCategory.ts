import { useQuery } from "@tanstack/react-query"

import { useErrorHandler } from "@/contexts/ErrorContext"

import { CategoryType } from "@/schemas/categorySchema"

import { getAllCategories } from "@/services/categoryService"

export const useGetAllCategories = () => {
  const handleError = useErrorHandler()

  return useQuery<CategoryType, Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        return await getAllCategories()
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
