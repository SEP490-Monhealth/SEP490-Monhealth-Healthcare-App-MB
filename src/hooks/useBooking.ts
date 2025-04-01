import { useRouter } from "expo-router"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useError } from "@/contexts/ErrorContext"
import { useModal } from "@/contexts/ModalContext"

import { BookingType, CreateBookingType } from "@/schemas/bookingSchema"

import {
  cancelBooking,
  createBooking,
  getBookingById,
  getBookingsByConsultantId,
  getBookingsByUserId,
  updateBookingStatus
} from "@/services/bookingService"

export const useGetBookingsByUserId = (userId: string | undefined) => {
  const handleError = useError()

  return useQuery<BookingType[], Error>({
    queryKey: ["bookings-user", userId],
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
    queryKey: ["bookings-consultant", consultantId, date],
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

export const useGetBookingById = (bookingId: string) => {
  const handleError = useError()

  return useQuery<BookingType, Error>({
    queryKey: ["booking", bookingId],
    queryFn: async () => {
      try {
        return await getBookingById(bookingId)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
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
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    }
  })
}

export const useUpdateBookingStatus = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const handleError = useError()
  const { showModal } = useModal()

  return useMutation<string, Error, { bookingId: string }>({
    mutationFn: async ({ bookingId }) => {
      try {
        return await updateBookingStatus(bookingId, showModal)
      } catch (error) {
        handleError(error)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
      router.replace({
        pathname: "/bookings",
        params: { tab: "confirmed" }
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
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    }
  })
}
