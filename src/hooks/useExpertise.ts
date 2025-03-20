import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { ExpertiseType } from "@/schemas/expertiseSchema"

import { getAllExpertise } from "@/services/expertiseService"

interface ExpertiseResponse {
  expertise: ExpertiseType[]
  totalPages: number
  totalItems: number
}

export const useGetAllExpertise = (page: number, limit?: number) => {
  const handleError = useError()

  return useQuery<ExpertiseResponse, Error>({
    queryKey: ["expertise", page, limit],
    queryFn: async () => {
      try {
        return await getAllExpertise(page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}
