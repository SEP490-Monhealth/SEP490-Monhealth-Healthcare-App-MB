import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import {
  BookingType,
  CreateBookingType,
  UpdateBookingType
} from "@/schemas/bookingSchema"

import {
  cancelBooking,
  completeBooking,
  createBooking,
  getBookingById,
  getBookingsByConsultantId,
  getBookingsByUserId,
  getBookingsByUserIdAndConsultantId,
  updateBooking
} from "@/services/bookingService"

interface BookingResponse {
  bookings: BookingType[]
  totalPages: number
  totalItems: number
}

export const useGetBookingsByUserId = (
  userId: string | undefined,
  page: number,
  limit?: number
) => {
  const handleError = useError()

  return useQuery<BookingResponse, Error>({
    queryKey: [MonQueryKey.Booking.UserBookings, userId, page, limit],
    queryFn: async () => {
      try {
        return await getBookingsByUserId(userId, page, limit)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetBookingsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  date?: string
) => {
  const handleError = useError()

  return useQuery<BookingResponse, Error>({
    queryKey: [MonQueryKey.Booking.ConsultantBookings, consultantId, date],
    queryFn: async () => {
      try {
        return await getBookingsByConsultantId(consultantId, page, limit, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetBookingsByUserIdAndConsultantId = (
  userId: string | undefined,
  consultantId: string | undefined
) => {
  const handleError = useError()

  return useQuery<BookingType[], Error>({
    queryKey: [
      MonQueryKey.Booking.UserConsultantBookings,
      userId,
      consultantId
    ],
    queryFn: async () => {
      try {
        return await getBookingsByUserIdAndConsultantId(userId, consultantId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!userId && !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetBookingById = (bookingId: string | undefined) => {
  const handleError = useError()

  return useQuery<BookingType, Error>({
    queryKey: [MonQueryKey.Booking.Booking, bookingId],
    queryFn: async () => {
      try {
        return await getBookingById(bookingId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!bookingId,
    staleTime: 1000 * 60 * 5
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, CreateBookingType>({
    mutationFn: async (newData) => {
      try {
        return await createBooking(newData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.ConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.UserSubscriptions]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.RemainingBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultants]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultant]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Schedule.Schedules]
      })
    }
  })
}

export const useUpdateBooking = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { bookingId: string | undefined; updatedData: UpdateBookingType }
  >({
    mutationFn: async ({ bookingId, updatedData }) => {
      try {
        return await updateBooking(bookingId, updatedData, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.ConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.Booking]
      })
    }
  })
}

export const useCompleteBooking = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { bookingId: string | undefined; evidenceUrls: string[] }
  >({
    mutationFn: async ({ bookingId, evidenceUrls }) => {
      try {
        return await completeBooking(bookingId, evidenceUrls, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.ConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.Booking]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultants]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultant]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Tracker.MonthlyBookings]
      })
    }
  })
}

export const useCancelBooking = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<
    string,
    Error,
    { bookingId: string; cancellationReason: string }
  >({
    mutationFn: async ({ bookingId, cancellationReason }) => {
      try {
        return await cancelBooking(bookingId, cancellationReason, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.ConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.UserConsultantBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Booking.Booking]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.UserSubscriptions]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.RemainingBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultants]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Consultant.Consultant]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Schedule.Schedules]
      })
    }
  })
}
