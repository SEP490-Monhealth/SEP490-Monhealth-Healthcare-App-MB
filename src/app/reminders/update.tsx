import React, { useState } from "react"

import { Text } from "react-native"

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

import {
  CreateUpdateReminderType,
  createUpdateReminderSchema
} from "@/schemas/reminderSchema"

function ReminderUpdateScreen() {
  const searchParams = useLocalSearchParams()
  
  const parsedReminder = searchParams.reminder
    ? JSON.parse(searchParams.reminder as string)
    : null

  const [time, setTime] = useState(new Date())
  const [hasUserSetTime, setHasUserSetTime] = useState(false)

  React.useEffect(() => {
    if (!hasUserSetTime && parsedReminder?.time) {
      const [hours, minutes] = parsedReminder.time.split(":").map(Number)
      const reminderDate = new Date()
      reminderDate.setHours(hours, minutes)

      if (
        time.getHours() !== reminderDate.getHours() ||
        time.getMinutes() !== reminderDate.getMinutes()
      ) {
        setTime(reminderDate)
      }
    }
  }, [parsedReminder, time, hasUserSetTime])

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUpdateReminderType>({
    resolver: zodResolver(createUpdateReminderSchema),
    defaultValues: parsedReminder
      ? {
          name: parsedReminder.name,
          time: parsedReminder.time,
          volume: parsedReminder.volume
        }
      : {
          name: "",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          volume: 0
        }
  })

  const handleTimeChange = (
    _event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (selectedTime) {
      setTime(selectedTime)
      setHasUserSetTime(true)
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
      setValue("time", formattedTime)
    }
  }

  const onSubmit = (data: CreateUpdateReminderType) => {
    console.log("Updated:", data)
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

export default ReminderUpdateScreen
