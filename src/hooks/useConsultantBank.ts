import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { getConsultantBanksByConsultantId } from "@/services/consultantBankService"

export const useGetConsultantBanksByConsultantId = (
  consultantId: string | undefined
) => {
  const handleError = useError()

  return useQuery<any[], Error>({
    queryKey: ["consultant-banks", consultantId],
    queryFn: async () => {
      try {
        return await getConsultantBanksByConsultantId(consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}
