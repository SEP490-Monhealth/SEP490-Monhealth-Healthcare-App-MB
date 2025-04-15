import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useAuth } from "@/contexts/AuthContext"
import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateUpdateMetricType, MetricType } from "@/schemas/metricSchema"

import { whoIAm } from "@/services/authService"
import { createMetric, getMetricsByUserId } from "@/services/metricService"

export const useGetMetricsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<MetricType[], Error>({
    queryKey: [MonQueryKey.Metric.Metrics, userId],
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
  const { setUser } = useAuth()
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
    onSuccess: async () => {
      const updatedUser = await whoIAm()
      setUser(updatedUser)
    }
  })
}

export const useUpdateMetric = (userId: string | undefined) => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateUpdateMetricType>({
    mutationFn: async (newData) => {
      try {
        return await createMetric(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Metric.Metrics] })
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: [MonQueryKey.Metric.Metrics, userId]
        })
        queryClient.invalidateQueries({ queryKey: ["goals", userId] })
      }
    }
  })
}
