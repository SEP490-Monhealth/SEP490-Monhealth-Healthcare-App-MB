import React, { useRef, useState } from "react"

import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Chip,
  Container,
  Content,
  HStack,
  Input,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { CancelBookingType, cancelBookingSchema } from "@/schemas/bookingSchema"

const cancellationReasons = [
  "Việc đột xuất",
  "Đổi lịch",
  "Không phù hợp",
  "Đổi tư vấn viên",
  "Hết nhu cầu",
  "Lỗi kỹ thuật",
  "Lý do khác"
]

function BookingCancelScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const { user } = useAuth()
  const userId = user?.userId

  const scrollViewRef = useRef<ScrollView>(null)

  const [selectedReasons, setSelectedReasons] = useState<string[]>([])

  const handleSelectQuick = (quickly: string) => {
    setSelectedReasons((prev) =>
      prev.includes(quickly)
        ? prev.filter((item) => item !== quickly)
        : [...prev, quickly]
    )
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CancelBookingType>({
    resolver: zodResolver(cancelBookingSchema),
    defaultValues: {
      cancellationReason: ""
    }
  })

  const onSubmit = async (data: CancelBookingType) => {
    const cancel = `${selectedReasons.join(" - ")}. ${data.cancellationReason}`

    const finalData = { ...data, cancel }

    console.log("Final Data:", JSON.stringify(finalData, null, 2))
  }

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  return (
    <Container>
      <Header back label="Hủy lịch hẹn" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
      >
        <Content className="mt-2">
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <VStack className="pb-20">
              <Text className="text-tregular text-center text-base text-secondary">
                Bạn đang hủy buổi hẹn với chuyên gia tư vấn. Vui lòng cho chúng
                tôi biết lý do để chúng tôi có thể cải thiện dịch vụ
              </Text>

              <Section label="Lý do hủy" margin={false} />

              <HStack
                gap={8}
                className="flex-row flex-wrap justify-center gap-y-3"
              >
                {cancellationReasons.map((reason) => (
                  <Chip
                    key={reason}
                    label={reason}
                    selected={selectedReasons.includes(reason)}
                    onPress={() => handleSelectQuick(reason)}
                  />
                ))}
              </HStack>

              <Section label="Chi tiết lý do" />

              <Controller
                name="cancellationReason"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    placeholder="Nhập lý do của bạn"
                    onChangeText={onChange}
                    isMultiline
                    numberOfLines={6}
                    canClearText
                    errorMessage={errors.cancellationReason?.message}
                    onFocus={scrollToInput}
                  />
                )}
              />
            </VStack>
          </ScrollView>

          <Button
            size="lg"
            onPress={handleSubmit(onSubmit)}
            className="absolute bottom-4 w-full"
          >
            Xác nhận
          </Button>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default BookingCancelScreen
