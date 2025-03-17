import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { TimeSlot } from "@/components/local/setup/TimeSlotSelector"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateScheduleType, ScheduleType } from "@/schemas/scheduleSchema"

import {
  createSchedule,
  getAllScheduleTimeSlots,
  getSchedulesByConsultantId
} from "@/services/scheduleService"

export const useGetSchedulesByConsultantId = (
  consultantId: string | undefined,
  date: string
) => {
  const handleError = useError()

  return useQuery<ScheduleType, Error>({
    queryKey: ["schedules", consultantId],
    queryFn: async () => {
      try {
        return await getSchedulesByConsultantId(consultantId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetAllScheduleTimeSlots = () => {
  const handleError = useError()

  return useQuery<TimeSlot[], Error>({
    queryKey: ["schedules-time-slots"],
    queryFn: async () => {
      try {
        return await getAllScheduleTimeSlots()
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateSchedule = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateScheduleType>({
    mutationFn: async (newScheduleData) => {
      try {
        return await createSchedule(newScheduleData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] })
    }
  })
}
