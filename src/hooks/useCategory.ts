import { useQuery } from "@tanstack/react-query"

import { CategoryEnum } from "@/constants/enums"

import { useError } from "@/contexts/ErrorContext"

import { CategoryType } from "@/schemas/categorySchema"

import { getCategoriesByTypes } from "@/services/categoryService"

export const useGetCategoriesByType = (type: CategoryEnum) => {
  const handleError = useError()

  return useQuery<CategoryType[], Error>({
    queryKey: ["categories", type],
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
