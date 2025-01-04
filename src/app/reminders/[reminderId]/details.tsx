import React, { useState } from "react"

import { Text, View } from "react-native"

import { useLocalSearchParams } from "expo-router"

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
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { sampleReminderData } from "@/constants/reminders"

import {
  CreateUpdateReminderType,
  createUpdateReminderSchema
} from "@/schemas/reminderSchema"

import { convertTimeStringToDate } from "@/utils/helpers"

const details = () => {
  const { reminderId } = useLocalSearchParams() as {
    reminderId: string
  }

  const reminderDetails = sampleReminderData.find(
    (reminder) => reminder.reminderId === reminderId
  )

  if (!reminderDetails) {
    console.log(`Không tìm thấy nhắc nhở với ID: ${reminderId}`)
    return <View>Không tìm thấy {reminderId}</View>
  }

  const [time, setTime] = useState(() =>
    convertTimeStringToDate(reminderDetails.time)
  )

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUpdateReminderType>({
    resolver: zodResolver(createUpdateReminderSchema),
    defaultValues: {
      name: reminderDetails.name,
      time: reminderDetails.time,
      volume: reminderDetails.volume
    }
  })

  const handleTimeChange = (
    _event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (selectedTime) {
      setTime(selectedTime)
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
      setValue("time", formattedTime)
    }
  }

  const onSubmit = (data: CreateUpdateReminderType) => {
    console.log("Cập nhật:", data)
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Chỉnh sửa nhắc nhở" />

      <Content className="mt-2">
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
        />

        <VStack gap={32}>
          <VStack gap={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  placeholder="Nhập tên nhắc nhở"
                  onChangeText={onChange}
                  keyboardType="default"
                  canClearText
                  errorMessage={errors.name?.message}
                  className="w-full"
                />
              )}
            />

            <Controller
              name="volume"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value ? value.toString() : ""}
                  placeholder="Nhập lượng nước"
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  keyboardType="numeric"
                  endIcon={
                    <Text className="font-tmedium text-base text-primary">
                      ml
                    </Text>
                  }
                  canClearText
                  errorMessage={errors.volume?.message}
                  className="w-full"
                />
              )}
            />
          </VStack>

          <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Cập nhật
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default details
