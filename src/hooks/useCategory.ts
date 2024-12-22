import { useQuery } from "@tanstack/react-query"

import { CategoryType } from "@/schemas/categorySchema"

import { getAllCategories } from "@/services/categoryService"

export const useGetAllCategories = () => {
  return useQuery<CategoryType, Error>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5
  })
}
