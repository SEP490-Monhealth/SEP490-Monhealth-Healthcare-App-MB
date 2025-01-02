import React, { useState } from "react"

import { Text } from "react-native"

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

function ReminderCreateScreen() {
  const [time, setTime] = useState(new Date())

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUpdateReminderType>({
    resolver: zodResolver(createUpdateReminderSchema),
    defaultValues: {
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
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
      setValue("time", formattedTime)
    }
  }

  const onSubmit = (data: CreateUpdateReminderType) => {
    console.log("Dữ liệu được gửi:", data)
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Tạo nhắc nhở" />

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

          <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
            Tạo nhắc nhở
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default ReminderCreateScreen
