import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateMetricType,
  MetricType,
  UpdateMetricType
} from "@/schemas/metricSchema"

import {
  createMetric,
  getMetricsByUserId,
  updateMetric
} from "@/services/metricService"

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

export const useUpdateMetric = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { metricId: string; updateData: UpdateMetricType; userId: string }
  >({
    mutationFn: async ({ metricId, updateData }) => {
      try {
        return await updateMetric(metricId, updateData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: (_data, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["metrics", userId] })
    }
  })
}
