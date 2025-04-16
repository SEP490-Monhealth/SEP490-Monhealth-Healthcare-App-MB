import React, { useEffect, useRef, useState } from "react"

import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native"

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
  Select,
  Sheet,
  SheetRefProps,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateScheduleException } from "@/hooks/useScheduleException"

import {
  CreateScheduleExceptionType,
  createScheduleExceptionSchema
} from "@/schemas/scheduleExceptionSchema"

import { formatDate, formatUTCDate } from "@/utils/formatters"

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

  const [selectedDate, setSelectedDate] = useState<string | Date>(getTomorrow())

  const { mutate: createScheduleException } =
    useCreateScheduleException(consultantId)

  const SheetRef = useRef<SheetRefProps>(null)

  const dateLabel = formatDate(selectedDate)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CreateScheduleExceptionType>({
    resolver: zodResolver(createScheduleExceptionSchema),
    defaultValues: {
      consultantId: "",
      date: "",
      reason: ""
    }
  })

  useEffect(() => {
    reset({
      consultantId: consultantId,
      date: formatUTCDate(new Date())
    })
  }, [reset])

  const openSheetDate = () => SheetRef.current?.scrollTo(-320)

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const tomorrow = getTomorrow()

      if (selectedDate >= tomorrow) {
        setValue("date", selectedDate.toISOString())
        setSelectedDate(selectedDate)
      }
    }
  }

  const onSubmit = async (data: CreateScheduleExceptionType) => {
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
        <Container>
          <Header back label="Tạo lịch nghỉ" />

          <Content className="mt-2">
            <VStack gap={32}>
              <VStack gap={12}>
                <Select
                  label="Ngày nghỉ"
                  defaultValue="Chọn ngày nghỉ"
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
                      label="Lý do nghỉ"
                      placeholder="VD: Hôm đó tôi có lịch nghỉ đột xuất"
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default CreateScheduleExceptionScreen
