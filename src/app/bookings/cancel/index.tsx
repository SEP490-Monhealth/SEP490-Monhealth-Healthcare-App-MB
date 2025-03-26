import React, { useRef, useState } from "react"

import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Chip,
  Container,
  Content,
  HStack,
  Input,
  Modal,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCancelBooking } from "@/hooks/useBooking"

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
  const router = useRouter()

  const { user } = useAuth()
  const userRole = user?.role

  const { bookingId } = useLocalSearchParams<{ bookingId: string }>()

  const scrollViewRef = useRef<ScrollView>(null)

  const { mutate: cancelBooking } = useCancelBooking()

  const [selectedReasons, setSelectedReasons] = useState<string[]>([])
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const handleSelectQuick = (quickly: string) => {
    setSelectedReasons((prev) =>
      prev.includes(quickly)
        ? prev.filter((item) => item !== quickly)
        : [...prev, quickly]
    )
  }

  const {
    control,
    getValues,
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

    // console.log("Final Data:", JSON.stringify(finalData, null, 2))

    setIsModalVisible(true)

    // await cancelBooking(
    //   { bookingId, cancellationReason: finalData.cancel },
    //   {
    //     onSuccess: () => {
    //       router.replace({
    //         pathname: "/bookings/user",
    //         params: { tab: "history" }
    //       })
    //     }
    //   }
    // )
  }

  const handleConfirmCancel = async () => {
    setIsModalVisible(false)

    const cancel = `${selectedReasons.join(" - ")}. ${
      getValues("cancellationReason") || ""
    }`

    await cancelBooking(
      { bookingId, cancellationReason: cancel },
      {
        onSuccess: () => {
          if (userRole === "user") {
            router.replace({
              pathname: "/bookings/user",
              params: { tab: "history" }
            })
          } else if (userRole === "consultant") {
            router.replace({
              pathname: "/(tabs)/consultant/booking",
              params: { tab: "cancelled" }
            })
          }
        },
        onError: (error) => {
          alert("Đã xảy ra lỗi khi hủy lịch hẹn. Vui lòng thử lại.")
          console.error(error)
        }
      }
    )
  }

  const scrollToInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 50)
  }

  return (
    <>
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
                  Bạn đang hủy buổi hẹn với chuyên gia tư vấn. Vui lòng cho
                  chúng tôi biết lý do để chúng tôi có thể cải thiện dịch vụ
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
              Hủy lịch
            </Button>
          </Content>
        </KeyboardAvoidingView>
      </Container>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Xác nhận hủy lịch hẹn"
        description="Bạn có chắc chắn muốn hủy lịch hẹn này không? Hành động này không thể hoàn tác."
        confirmText="Đồng ý"
        cancelText="Hủy"
        onConfirm={handleConfirmCancel}
      />
    </>
  )
}

export default BookingCancelScreen
