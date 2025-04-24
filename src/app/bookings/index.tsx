import React, { useRef, useState } from "react"

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Clock } from "iconsax-react-native"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Card,
  Container,
  Content,
  HStack,
  Input,
  Modal,
  VStack
} from "@/components/global/atoms"
import { BookingItem, RatingStars } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { COLORS } from "@/constants/color"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateBooking } from "@/hooks/useBooking"
import { useGetConsultantById } from "@/hooks/useConsultant"

import { CreateBookingType, createBookingSchema } from "@/schemas/bookingSchema"

import { useBookingStore } from "@/stores/bookingStore"

import { formatDate } from "@/utils/formatters"
import { getInitials } from "@/utils/helpers"

import { LoadingScreen } from "../loading"

const formatTime = (time: string) => {
  const [hour, minute] = time.split(":")
  return `${hour}h${minute}`
}

function BookingsScreen() {
  const router = useRouter()
  const { consultantId } = useLocalSearchParams() as {
    consultantId: string
  }

  const { user } = useAuth()
  const userId = user?.userId

  const { date: storedDate, startTime, endTime } = useBookingStore()

  // console.log(storedDate)

  const scrollViewRef = useRef<ScrollView>(null)

  const { mutate: createBooking, isPending: isSubmitting } = useCreateBooking()

  const { data: consultantData, isLoading: isConsultantLoading } =
    useGetConsultantById(consultantId)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const bookingItems = [
    {
      icon: <Calendar variant="Bold" size={20} color={COLORS.primary} />,
      label: "Ngày",
      value: formatDate(storedDate)
    },
    {
      icon: <Clock variant="Bold" size={20} color={COLORS.primary} />,
      label: "Thời gian",
      value: `${formatTime(startTime)} - ${formatTime(endTime)}`
    }
  ]

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

  const onSubmit = async (data: CreateBookingType) => {
    Keyboard.dismiss()
    setIsLoading(true)

    try {
      console.log("Final Data:", JSON.stringify(data, null, 2))

      await createBooking(data, {
        onSuccess: () => {
          router.replace(`/settings/user/${userId}/bookings`)
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

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  if (isConsultantLoading || !consultantData) return <LoadingScreen />

  return (
    <>
      <Container>
        <Header back label="Tạo lịch hẹn" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
        >
          <Content className="mt-2">
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
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
                        {consultantData.expertise} • KN{" "}
                        {consultantData.experience} năm
                      </Text>
                    </VStack>

                    <RatingStars
                      rating={consultantData.averageRating}
                      count={consultantData.ratingCount}
                      showCount
                    />
                  </VStack>
                </HStack>

                <View>
                  <Section label="Chi tiết" />

                  <Card className="py-2">
                    {bookingItems.map((item, index) => (
                      <BookingItem
                        key={index}
                        icon={item.icon}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Card>
                </View>

                <View>
                  <Section label="Ghi chú" />

                  <Controller
                    name="notes"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        value={value ? value.toString() : ""}
                        placeholder="VD: Tôi muốn hỏi về chế độ ăn kiêng."
                        onChangeText={(text) => onChange(text)}
                        isMultiline
                        numberOfLines={6}
                        canClearText
                        errorMessage={errors.notes?.message}
                        onFocus={scrollToInput}
                      />
                    )}
                  />
                </View>

                <Text className="ml-1 mt-4 font-tregular text-sm text-accent">
                  Thông tin thêm giúp chuyên viên tư vấn chuẩn bị tốt hơn cho
                  buổi tư vấn
                </Text>

                <Button
                  loading={isLoading}
                  disabled={isLoading || isSubmitting}
                  onPress={handleOpenModal}
                  className="mt-8"
                >
                  Đặt lịch
                </Button>
              </View>
            </ScrollView>
          </Content>
        </KeyboardAvoidingView>
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
