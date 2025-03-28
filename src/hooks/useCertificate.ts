import { useQuery } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CertificateType } from "@/schemas/certificateSchema"

import { getCertificatesByConsultantId } from "@/services/certificateService"

export const useGetCertificatesByConsultantId = (
  consultantId: string | undefined
) => {
  const handleError = useError()

  return useQuery<CertificateType[], Error>({
    queryKey: ["certificates", consultantId],
    queryFn: async () => {
      try {
        return await getCertificatesByConsultantId(consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}
