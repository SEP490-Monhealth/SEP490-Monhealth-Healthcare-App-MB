import { useQuery } from "@tanstack/react-query"

import { CategoryTypeEnum } from "@/constants/enum/Category"
import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"

import { CategoryType } from "@/schemas/categorySchema"

import { getCategoriesByTypes } from "@/services/categoryService"

export const useGetCategoriesByType = (type: CategoryTypeEnum) => {
  const handleError = useError()

  return useQuery<CategoryType[], Error>({
    queryKey: [MonQueryKey.Category.Categories, type],
    queryFn: async () => {
      try {
        return await getCategoriesByTypes(type)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
