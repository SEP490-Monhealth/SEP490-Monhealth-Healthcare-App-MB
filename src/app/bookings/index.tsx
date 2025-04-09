import React, { useState } from "react"

import { Image, Text, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  HStack,
  Input,
  Modal,
  ScrollArea,
  VStack
} from "@/components/global/atoms"
import { RatingStars } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateBooking } from "@/hooks/useBooking"
import { useGetConsultantById } from "@/hooks/useConsultant"

import { CreateBookingType, createBookingSchema } from "@/schemas/bookingSchema"

import { useBookingStore } from "@/stores/bookingStore"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

function BookingsScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams() as {
    consultantId: string
  }

  const { date: storedDate, startTime, endTime } = useBookingStore()

  const { user } = useAuth()
  const userId = user?.userId

  // console.log(storedDate)

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)

  const { mutate: createBooking } = useCreateBooking()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateBookingType>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      userId: userId,
      consultantId: consultantId,
      date: storedDate ?? "",
      startTime: startTime || "",
      endTime: endTime || "",
      notes: ""
    }
  })

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":")
    return `${hour}h${minute}`
  }

  const onSubmit = async (data: CreateBookingType) => {
    setIsLoading(true)

    try {
      // console.log("Final Data:", JSON.stringify(data, null, 2))

      await createBooking(data, {
        onSuccess: () => {
          router.replace({
            pathname: `/settings/user/${userId}/bookings`,
            params: { tab: "pending" }
          })
        }
      })
    } catch (error) {
      console.error("Error creating booking:", error)
    } finally {
      setIsLoading(false)
      setIsModalVisible(false)
    }
  }

  const handleOpenModal = () => {
    setIsModalVisible(true)
  }

  const handleConfirm = () => {
    handleSubmit(onSubmit)()
  }

  if (isConsultantLoading || !consultantData) return <LoadingScreen />

  return (
    <>
      <Container>
        <Header back label="Tạo lịch hẹn" />

        <Content className="mt-2">
          <ScrollArea className="flex-1">
            <View className="pb-12">
              <HStack center gap={20}>
                {consultantData.avatarUrl ? (
                  <Image
                    source={{ uri: consultantData.avatarUrl }}
                    className="h-24 w-24 rounded-2xl border border-border"
                  />
                ) : (
                  <View className="flex h-24 w-24 items-center justify-center rounded-xl border border-muted bg-border">
                    <Text className="font-tbold text-lg text-primary">
                      {getInitials(consultantData.fullName)}
                    </Text>
                  </View>
                )}

                <VStack gap={8}>
                  <VStack gap={0}>
                    <Text className="font-tbold text-2xl text-primary">
                      {consultantData.fullName}
                    </Text>

                    <Text className="font-tmedium text-base text-accent">
                      {consultantData.expertise} • {consultantData.experience}{" "}
                      năm
                    </Text>
                  </VStack>

                  <RatingStars
                    rating={consultantData.averageRating}
                    count={consultantData.ratingCount}
                    showCount
                  />
                </VStack>
              </HStack>

              <Section
                label="Thời gian"
                actionText={`${formatDate(storedDate)}, ${formatTime(startTime)} - ${formatTime(endTime)}`}
              />

              <Controller
                name="notes"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value ? value.toString() : ""}
                    label="Ghi chú"
                    placeholder="VD: Tôi muốn hỏi về chế độ ăn kiêng."
                    onChangeText={(text) => onChange(text)}
                    isMultiline
                    numberOfLines={6}
                    canClearText
                    errorMessage={errors.notes?.message}
                  />
                )}
              />

              <Text className="ml-1 mt-4 font-tregular text-sm text-accent">
                Thông tin thêm giúp tư vấn viên chuẩn bị tốt hơn cho buổi tư vấn
              </Text>

              <Button
                loading={isLoading}
                onPress={handleOpenModal}
                className="mt-8"
              >
                Đặt lịch
              </Button>
            </View>
          </ScrollArea>
        </Content>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Đặt lịch hẹn"
        description="Bạn có chắc chắn muốn đặt lịch hẹn này không?"
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirm}
      />
    </>
  )
}

export default BookingsScreen
