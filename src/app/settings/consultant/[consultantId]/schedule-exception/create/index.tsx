import React, { useRef, useState } from "react"

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
  ScrollArea,
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

function CreateScheduleExceptionScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { mutate: createScheduleException } =
    useCreateScheduleException(consultantId)

  const DateRef = useRef<SheetRefProps>(null)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateScheduleExceptionType>({
    resolver: zodResolver(createScheduleExceptionSchema),
    defaultValues: {
      consultantId: consultantId,
      date: "",
      reason: ""
    }
  })

  const [selectedDate, setSelectedDate] = useState<string | Date>("")

  const openSheetDate = () => DateRef.current?.scrollTo(-320)

  const onChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = formatUTCDate(selectedDate)
      setValue("date", formattedDate)
      setSelectedDate(selectedDate)
    }
  }

  const dateLabel = formatDate(selectedDate)

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
          <Header back label="Tạo lịch bận" />

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

export default CreateScheduleExceptionScreen
