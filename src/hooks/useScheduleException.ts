import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  CreateScheduleExceptionType,
  ScheduleExceptionType,
  UpdateScheduleExceptionType
} from "@/schemas/scheduleExceptionSchema"

import {
  createScheduleException,
  deleteScheduleException,
  getScheduleExceptionByConsultantId,
  getScheduleExceptionById,
  updateScheduleException
} from "@/services/scheduleExceptionService"

interface ScheduleExceptionResponse {
  scheduleExceptions: ScheduleExceptionType[]
  totalPages: number
  totalItems: number
}

export const useGetScheduleExceptionByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<ScheduleExceptionResponse, Error>({
    queryKey: ["schedule-exceptions", consultantId, page, limit],
    queryFn: async () => {
      try {
        return await getScheduleExceptionByConsultantId(
          consultantId,
          page,
          limit
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useGetScheduleExceptionById = (
  scheduleExceptionId: string | undefined
) => {
  const handleError = useError()

  return useQuery<ScheduleExceptionType, Error>({
    queryKey: [scheduleExceptionId],
    queryFn: async () => {
      try {
        return await getScheduleExceptionById(scheduleExceptionId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!scheduleExceptionId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateScheduleException = (
  consultantId: string | undefined
) => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateScheduleExceptionType>({
    mutationFn: async (newData) => {
      try {
        return await createScheduleException(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      if (consultantId) {
        queryClient.invalidateQueries({
          queryKey: ["schedule-exceptions", consultantId]
        })
      }
    }
  })
}

export const useUpdateScheduleException = (
  consultantId: string | undefined
) => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { scheduleExceptionId: string; updatedData: UpdateScheduleExceptionType }
  >({
    mutationFn: async ({ scheduleExceptionId, updatedData }) => {
      try {
        return await updateScheduleException(
          scheduleExceptionId,
          updatedData,
          showModal
        )
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      if (consultantId) {
        queryClient.invalidateQueries({
          queryKey: ["schedule-exceptions", consultantId]
        })
      }
    }
  })
}

export const useDeleteScheduleException = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, string>({
    mutationFn: async (scheduleExceptionId) => {
      try {
        return await deleteScheduleException(scheduleExceptionId, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule-exceptions"] })
    }
  })
}
