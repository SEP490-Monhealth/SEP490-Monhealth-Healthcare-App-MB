import React, { useEffect, useRef, useState } from "react"

import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native"

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

import { formatDate, formatUTCDate } from "@/utils/formatters"

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
  const DateRef = useRef<SheetRefProps>(null)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<UpdateScheduleExceptionType>({
    resolver: zodResolver(updateScheduleExceptionSchema),
    defaultValues: {
      date: scheduleExceptionData?.date,
      reason: scheduleExceptionData?.reason
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
  }, [scheduleExceptionData])

  const openSheetDate = () => DateRef.current?.scrollTo(-320)

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = formatUTCDate(selectedDate)
      setValue("date", formattedDate)
      setSelectedDate(selectedDate)
    }
  }

  const dateLabel = formatDate(selectedDate)

  const onSubmit = async (data: UpdateScheduleExceptionType) => {
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

          <Content>
            <ScrollArea>
              <VStack gap={12} className="pb-20">
                <Select
                  label="Ngày bận"
                  defaultValue="Chọn ngày bận"
                  value={dateLabel}
                  onPress={openSheetDate}
                  errorMessage={errors.date?.message}
                />

                <Controller
                  name="reason"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      value={value}
                      label="Lý do bận"
                      placeholder="VD: Hôm đó tôi có lịch bận đột xuất"
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
          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
            Tạo lịch bận
          </Button>
        </Container>

        <Sheet ref={DateRef} dynamicHeight={300}>
          <View className="items-center">
            <DateTimePicker
              value={new Date(selectedDate)}
              mode="date"
              display="spinner"
              onChange={onChange}
              minimumDate={new Date()}
              locale="vi"
            />
          </View>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default UpdateScheduleExceptionScreen
