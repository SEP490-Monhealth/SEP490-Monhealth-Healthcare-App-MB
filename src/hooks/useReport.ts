import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { CreateReportType, ReportType } from "@/schemas/reportSchema"

import {
  createReport,
  getReportByBookingId,
  getReportsByUserId
} from "@/services/reportService"

interface ReportResponse {
  reports: ReportType[]
  totalPages: number
  totalItems: number
}

export const useGetReportByUserId = (
  userId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<ReportResponse, Error>({
    queryKey: [MonQueryKey.Report.UserReports, userId, page, limit],
    queryFn: async () => {
      try {
        return await getReportsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetReportByBookingId = (bookingId: string | undefined) => {
  const handleError = useError()

  return useQuery<ReportType[], Error>({
    queryKey: [MonQueryKey.Report.BookingReport, bookingId],
    queryFn: async () => {
      try {
        return await getReportByBookingId(bookingId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateReport = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateReportType>({
    mutationFn: async (newData) => {
      try {
        return await createReport(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MonQueryKey.Booking.Booking] })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserConsultantBookings]
      })
    }
  })
}
