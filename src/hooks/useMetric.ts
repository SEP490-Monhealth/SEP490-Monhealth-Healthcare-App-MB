import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"

import { CreateUpdateMetricType, MetricType } from "@/schemas/metricSchema"

import { createMetric, getMetricsByUserId } from "@/services/metricService"

export const useGetMetricsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<MetricType[], Error>({
    queryKey: ["metrics", userId],
    queryFn: async () => {
      try {
        return await getMetricsByUserId(userId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateMetric = () => {
  const handleError = useError()

  return useMutation<string, Error, CreateUpdateMetricType>({
    mutationFn: async (newData) => {
      try {
        return await createMetric(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    }
  })
}

export const useUpdateMetric = (userId: string | undefined) => {
  const queryClient = useQueryClient()
  const handleError = useError()

  return useMutation<string, Error, CreateUpdateMetricType>({
    mutationFn: async (newData) => {
      try {
        return await createMetric(newData)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metrics"] })
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["metrics", userId] })
        queryClient.invalidateQueries({ queryKey: ["goals", userId] })
      }
    }
  })
}
