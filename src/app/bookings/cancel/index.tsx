import React from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarCircle, TimerStart } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  HStack,
  Input,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { sampleBookingsData } from "@/constants/bookings"
import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { CancelBookingType, cancelBookingSchema } from "@/schemas/bookingSchema"

import { formatDate } from "@/utils/formatters"

function CancelBookingScreen() {
  const { user } = useAuth()
  const userId = user?.userId
  const { bookingId } = useLocalSearchParams() as { bookingId: string }

  const bookingData = sampleBookingsData.find(
    (bookingData) => bookingData.bookingId === bookingId
  )

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CancelBookingType>({
    resolver: zodResolver(cancelBookingSchema),
    defaultValues: {
      userId: userId,
      bookingId: bookingId,
      reason: ""
    }
  })

  const onSubmit = async (cancelData: CancelBookingType) => {
    console.log("Final Data:", JSON.stringify(cancelData, null, 2))
  }

  if (!bookingData) return <LoadingScreen />

  return (
    <Container>
      <Header back label="Hủy lịch hẹn" />

      <Content className="mt-2">
        <ScrollArea>
          <VStack gap={20}>
            <HStack center gap={12}>
              <Image
                source={{ uri: bookingData.consultantAvatar }}
                className="h-20 w-20 rounded-2xl border border-border"
              />

              <VStack>
                <Section label="Tư vấn viên" margin={false} />
                <Text className="-mt-2 font-tbold text-2xl text-primary">
                  {bookingData.consultant}
                </Text>
              </VStack>
            </HStack>

            <HStack center gap={12}>
              <Image
                source={{ uri: bookingData.customerAvatar }}
                className="h-20 w-20 rounded-2xl border border-border"
              />

              <VStack>
                <Section label="Khách hàng" margin={false} />
                <Text className="-mt-2 font-tbold text-2xl text-primary">
                  {bookingData.customer}
                </Text>
              </VStack>
            </HStack>

            <VStack>
              <Section label="Thời gian đặt lịch" margin={false} />
              <HStack center className="justify-between">
                <HStack center>
                  <TimerStart
                    variant="Bold"
                    size="30"
                    color={COLORS.secondary}
                  />
                  <Text className="font-tmedium text-lg text-accent">
                    {bookingData.time}
                  </Text>
                </HStack>
                <HStack center>
                  <CalendarCircle
                    variant="Bold"
                    size="30"
                    color={COLORS.secondary}
                  />
                  <Text className="font-tmedium text-lg text-accent">
                    {formatDate(bookingData.date)}
                  </Text>
                </HStack>
              </HStack>
            </VStack>

            <VStack>
              <Section label="Ghi chú dành cho tư vấn viên" margin={false} />

              <Input
                disabled
                value={bookingData.notes || "Không có ghi chú"}
                keyboardType="default"
                isMultiline
                numberOfLines={6}
              />
            </VStack>

            <VStack>
              <Section label="Lý do hủy" margin={false} />

              <Controller
                name="reason"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="VD: Vì bận công việc, không cần nữa,..."
                    onChangeText={(text) => onChange(text)}
                    keyboardType="default"
                    isMultiline
                    numberOfLines={4}
                    canClearText
                    errorMessage={errors.reason?.message}
                  />
                )}
              />
            </VStack>
          </VStack>
        </ScrollArea>
      </Content>

      <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
        Hủy lịch hẹn
      </Button>
    </Container>
  )
}

export default CancelBookingScreen
