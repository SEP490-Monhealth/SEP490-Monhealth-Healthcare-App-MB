import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CreateMetricType, MetricType } from "@/schemas/metricSchema"

import { createMetric, getMetricsByUserId } from "@/services/metricService"

export const useGetMetricsByUserId = (metricId: string | undefined) => {
  const handleError = useError()

  return useQuery<MetricType[], Error>({
    queryKey: ["metrics", metricId],
    queryFn: async () => {
      try {
        return await getMetricsByUserId(metricId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!metricId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateMetric = () => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, CreateMetricType>({
    mutationFn: async (metric) => {
      try {
        return await createMetric(metric)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metrics"] })
    }
  })
}
