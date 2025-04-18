import React, { useEffect, useRef, useState } from "react"

import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from "react-native"

import { useLocalSearchParams, useRouter } from "expo-router"

import { LoadingScreen } from "@/app/loading"
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
  ScrollArea,
  Select,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  useGetScheduleExceptionById,
  useUpdateScheduleException
} from "@/hooks/useScheduleException"

import {
  UpdateScheduleExceptionType,
  updateScheduleExceptionSchema
} from "@/schemas/scheduleExceptionSchema"

import { formatDate, formatDateY } from "@/utils/formatters"

const getTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}

function UpdateScheduleExceptionScreen() {
  const router = useRouter()

  const { consultantId, scheduleExceptionId } = useLocalSearchParams<{
    consultantId: string
    scheduleExceptionId: string
  }>()

  const { mutate: updateScheduleException } =
    useUpdateScheduleException(consultantId)

  const { data: scheduleExceptionData } =
    useGetScheduleExceptionById(scheduleExceptionId)

  const [selectedDate, setSelectedDate] = useState<string | Date>(
    scheduleExceptionData?.date || ""
  )
  const SheetRef = useRef<SheetRefProps>(null)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<UpdateScheduleExceptionType>({
    resolver: zodResolver(updateScheduleExceptionSchema),
    defaultValues: {
      date: "",
      reason: ""
    }
  })

  useEffect(() => {
    if (scheduleExceptionData) {
      reset({
        date: scheduleExceptionData.date,
        reason: scheduleExceptionData.reason
      })
      setSelectedDate(scheduleExceptionData.date)
    }
  }, [scheduleExceptionData, reset])

  const openSheet = () => SheetRef.current?.scrollTo(-320)

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = formatDateY(selectedDate)
      setValue("date", formattedDate)
      setSelectedDate(selectedDate)
    }
  }

  const dateLabel = formatDate(selectedDate)

  const onSubmit = async (data: UpdateScheduleExceptionType) => {
    Keyboard.dismiss()

    // console.log("Final Data:", JSON.stringify(data, null, 2))

    updateScheduleException(
      { scheduleExceptionId, updatedData: data },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }

  if (!scheduleExceptionData) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Cập nhật" />

          <Content className="mt-2">
            <ScrollArea>
              <VStack gap={12} className="pb-20">
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
                      placeholder="VD: Hôm đó tôi có lịch nghỉ đột xuất"
                      onChangeText={onChange}
                      isMultiline
                      numberOfLines={4}
                      canClearText
                      errorMessage={errors.reason?.message}
                    />
                  )}
                />
              </VStack>
            </ScrollArea>
          </Content>

          <Button onPress={handleSubmit(onSubmit)} className="mb-4">
            Cập nhật
          </Button>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={300}>
          <View className="items-center">
            <DateTimePicker
              value={new Date(selectedDate)}
              mode="date"
              display="spinner"
              onChange={onChange}
              minimumDate={getTomorrow()}
              locale="vi"
            />
          </View>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default UpdateScheduleExceptionScreen
