import React, { useEffect } from "react"

import { Keyboard } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetBookingById, useUpdateBooking } from "@/hooks/useBooking"

import { UpdateBookingType, updateBookingSchema } from "@/schemas/bookingSchema"

function BookingUpdateScreen() {
  const router = useRouter()
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { mutate: updateBooking } = useUpdateBooking()

  const { data: bookingData } = useGetBookingById(bookingId)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateBookingType>({
    resolver: zodResolver(updateBookingSchema),
    defaultValues: {
      notes: ""
    }
  })

  useEffect(() => {
    if (bookingData?.notes) {
      reset({
        notes: bookingData.notes
      })
    }
  }, [bookingData, reset])

  const onSubmit = async (data: UpdateBookingType) => {
    Keyboard.dismiss()

    // console.log(JSON.stringify(data, null, 2))

    updateBooking(
      { bookingId, updatedData: data },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }

  if (!bookingData) {
    return <LoadingScreen />
  }

  console.log("errors", errors)

  return (
    <Container>
      <Header label="Cập nhật lịch hẹn" />

      <Content className="mt-2">
        <VStack gap={32}>
          <Controller
            name="notes"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                label="Ghi chú"
                placeholder="VD: Tôi muốn hỏi về chế độ ăn kiêng."
                onChangeText={onChange}
                isMultiline
                numberOfLines={6}
                errorMessage={errors.notes?.message}
              />
            )}
          />

          <Button onPress={handleSubmit(onSubmit)} className="mb-4">
            Cập nhật
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default BookingUpdateScreen
