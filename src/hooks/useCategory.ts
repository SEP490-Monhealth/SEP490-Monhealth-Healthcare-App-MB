import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CategoryType } from "@/schemas/categorySchema"

import { getAllCategories } from "@/services/categoryService"

export const useGetAllCategories = () => {
  const handleError = useError()

  return useQuery<CategoryType[], Error>({
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
