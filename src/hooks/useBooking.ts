import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { MonQueryKey } from "@/constants/query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { BookingType, CreateBookingType } from "@/schemas/bookingSchema"

import {
  cancelBooking,
  createBooking,
  getBookingById,
  getBookingsByConsultantId,
  getBookingsByUserId,
  getBookingsByUserIdAndConsultantId,
  getMonthlyBookingsByConsultantId,
  updateBookingStatus
} from "@/services/bookingService"

interface BookingResponse {
  bookings: BookingType[]
  totalPages: number
  totalItems: number
}

export const useGetBookingsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<BookingType[], Error>({
    queryKey: [MonQueryKey.Booking.UserBookings, userId],
    queryFn: async () => {
      try {
        return await getBookingsByUserId(userId)
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
  date?: string
) => {
  const handleError = useError()

  return useQuery<BookingType[], Error>({
    queryKey: [MonQueryKey.Booking.ConsultantBookings, consultantId, date],
    queryFn: async () => {
      try {
        return await getBookingsByConsultantId(consultantId, date)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    enabled: !!consultantId,
    staleTime: 1000 * 60 * 5
  })
}

export const useGetMonthlyBookingsByConsultantId = (
  consultantId: string | undefined,
  page: number,
  limit?: number,
  month?: string
) => {
  const handleError = useError()

  return useQuery<BookingResponse, Error>({
    queryKey: [
      MonQueryKey.Booking.MonthlyBookings,
      consultantId,
      page,
      limit,
      month
    ],
    queryFn: async () => {
      try {
        return await getMonthlyBookingsByConsultantId(
          consultantId,
          page,
          limit,
          month
        )
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
        queryKey: [MonQueryKey.Subscription.RemainingBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.UserSubscriptions]
      })
    }
  })
}

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, { bookingId: string | undefined }>({
    mutationFn: async ({ bookingId }) => {
      try {
        return await updateBookingStatus(bookingId, showModal)
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
        queryKey: [MonQueryKey.Subscription.RemainingBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.UserSubscriptions]
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
        queryKey: [MonQueryKey.Subscription.RemainingBookings]
      })
      queryClient.invalidateQueries({
        queryKey: [MonQueryKey.Subscription.UserSubscriptions]
      })
    }
  })
}
