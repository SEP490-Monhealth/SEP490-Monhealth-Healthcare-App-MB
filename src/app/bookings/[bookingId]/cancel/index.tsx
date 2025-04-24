import React, { useRef, useState } from "react"

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text
} from "react-native"

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

import { useCancelBooking } from "@/hooks/useBooking"

import { CancelBookingType, cancelBookingSchema } from "@/schemas/bookingSchema"

const cancellationReasons = [
  "Việc đột xuất",
  "Đổi lịch",
  "Không phù hợp",
  "Đổi chuyên viên",
  "Hết nhu cầu",
  "Lỗi kỹ thuật",
  "Lý do khác"
]

function BookingCancelScreen() {
  const router = useRouter()
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

  const onSubmit = async () => {
    Keyboard.dismiss()
    setIsModalVisible(true)
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
          router.back()
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 20}
        >
          <Content className="mt-2">
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 60 }}
            >
              <VStack gap={32}>
                <VStack>
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

                <Button onPress={handleSubmit(onSubmit)} className="w-full">
                  Hủy lịch
                </Button>
              </VStack>
            </ScrollView>
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
