import React, { useEffect, useRef, useState } from "react"

import {
  Alert,
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

import { BookingStatusEnum } from "@/constants/enum/Booking"

import { useAuth } from "@/contexts/AuthContext"

import { useGetBookingsByConsultantId } from "@/hooks/useBooking"
import { useCreateScheduleException } from "@/hooks/useScheduleException"

import {
  CreateScheduleExceptionType,
  createScheduleExceptionSchema
} from "@/schemas/scheduleExceptionSchema"

import { formatDate, formatDateY } from "@/utils/formatters"

const getTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}

function CreateScheduleExceptionScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const tomorrowDate = getTomorrow()
  const [selectedDate, setSelectedDate] = useState<Date>(tomorrowDate)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const dateLabel = formatDate(selectedDate)

  const SheetRef = useRef<SheetRefProps>(null)

  const { mutate: createScheduleException } =
    useCreateScheduleException(consultantId)

  const localDate = new Date(selectedDate)
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset())
  const formattedDate = localDate.toISOString().split("T")[0]

  const { data: bookingsData } = useGetBookingsByConsultantId(
    consultantId,
    formattedDate
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
      const tomorrow = getTomorrow()

      if (selectedDate >= tomorrow) {
        setValue("date", formatDateY(selectedDate))
        setSelectedDate(selectedDate)
      }
    }
  }

  const checkForBookings = () => {
    const hasBooking = bookingsData?.some(
      (booking) =>
        booking.date === formatDateY(selectedDate) &&
        (booking.status === BookingStatusEnum.Pending ||
          booking.status === BookingStatusEnum.Confirmed)
    )

    return hasBooking
  }

  const onSubmit = async (data: CreateScheduleExceptionType) => {
    Keyboard.dismiss()

    if (checkForBookings()) {
      setIsModalVisible(true)
      return
    }

    // console.log("Final Data:", JSON.stringify(data, null, 2))

    await createScheduleException(data, {
      onSuccess: () => {
        router.back()
      }
    })
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
              minimumDate={getTomorrow()}
              locale="vi"
            />
          </View>
        </Sheet>

        <Modal
          isVisible={isModalVisible}
          title="Cảnh báo"
          description="Ngày này đã có lịch hẹn. Vui lòng chọn ngày khác hoặc hủy lịch hẹn."
          confirmText="Đồng ý"
          onClose={() => setIsModalVisible(false)}
          onConfirm={() => setIsModalVisible(false)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default CreateScheduleExceptionScreen
