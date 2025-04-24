import React, { useEffect, useRef, useState } from "react"

import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View
} from "react-native"

import { useRouter } from "expo-router"

import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { Controller, useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  Input,
  Modal,
  Select,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByConsultantId } from "@/hooks/useBooking"
import { useCreateScheduleException } from "@/hooks/useScheduleException"

import {
  CreateScheduleExceptionType,
  createScheduleExceptionSchema
} from "@/schemas/scheduleExceptionSchema"

import { formatDate, formatDateY } from "@/utils/formatters"

function CreateScheduleExceptionScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const today = new Date()

  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const dateLabel = formatDate(selectedDate)

  const [formData, setFormData] = useState<CreateScheduleExceptionType | null>(
    null
  )

  const SheetRef = useRef<SheetRefProps>(null)

  const { mutate: createScheduleException } = useCreateScheduleException()

  const { data: bookingsData } = useGetBookingsByConsultantId(
    consultantId,
    formatDateY(selectedDate)
  )

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CreateScheduleExceptionType>({
    resolver: zodResolver(createScheduleExceptionSchema),
    defaultValues: {
      consultantId: consultantId,
      date: formatDateY(selectedDate),
      reason: ""
    }
  })

  useEffect(() => {
    reset({
      consultantId: consultantId,
      date: formatDateY(selectedDate)
    })
  }, [reset])

  const openSheet = () => SheetRef.current?.scrollTo(-320)

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setValue("date", formatDateY(selectedDate))
      setSelectedDate(selectedDate)
    }
  }

  const checkForBookings = () => {
    const hasBooking = bookingsData?.some(
      (booking) => booking.date === formatDateY(selectedDate)
    )

    return hasBooking
  }

  const onSubmit = async (data: CreateScheduleExceptionType) => {
    Keyboard.dismiss()

    if (checkForBookings()) {
      setFormData(data)
      setIsModalVisible(true)
      return
    }

    submitScheduleException(data)
  }

  const submitScheduleException = (data: CreateScheduleExceptionType) => {
    // console.log("Final Data:", JSON.stringify(data, null, 2))

    createScheduleException(data, {
      onSuccess: () => {
        router.back()
      }
    })
  }

  const handleConfirmModal = () => {
    setIsModalVisible(false)

    if (formData) {
      submitScheduleException(formData)
      setFormData(null)
    }
  }

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container dismissKeyboard>
          <Header back label="Tạo lịch nghỉ" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={12}>
                <Select
                  label="Ngày"
                  defaultValue="Chọn ngày nghỉ"
                  value={dateLabel}
                  onPress={openSheet}
                  errorMessage={errors.date?.message}
                />

                <Controller
                  name="reason"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Lý do"
                      placeholder="VD: Hôm đó tôi có lịch bận đột xuất"
                      onChangeText={onChange}
                      isMultiline
                      numberOfLines={6}
                      canClearText
                      errorMessage={errors.reason?.message}
                    />
                  )}
                />
              </VStack>

              <Button onPress={handleSubmit(onSubmit)}>Tạo lịch nghỉ</Button>
            </VStack>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={300}>
          <View className="items-center">
            <DateTimePicker
              value={selectedDate ? new Date(selectedDate) : new Date()}
              mode="date"
              display="spinner"
              onChange={onChange}
              minimumDate={today}
              locale="vi"
            />
          </View>
        </Sheet>

        <Modal
          isVisible={isModalVisible}
          title="Cảnh báo"
          description="Ngày này đã có lịch hẹn. Bạn có chắc chắn muốn tạo lịch nghỉ không?"
          cancelText="Hủy"
          confirmText="Đồng ý"
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleConfirmModal}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default CreateScheduleExceptionScreen
