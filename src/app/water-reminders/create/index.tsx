import React, { useState } from "react"

import { Keyboard, Text } from "react-native"

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
  HStack,
  Input,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useAuth } from "@/contexts/AuthContext"

import { useCreateWaterReminder } from "@/hooks/useWaterReminder"

import {
  CreateWaterReminderType,
  createWaterReminderSchema
} from "@/schemas/waterReminderSchema"

function WaterReminderCreateScreen() {
  const router = useRouter()

  const { user } = useAuth()
  const userId = user?.userId || ""

  const { mutate: addWaterReminder } = useCreateWaterReminder()

  const [time, setTime] = useState<Date>(new Date())

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateWaterReminderType>({
    resolver: zodResolver(createWaterReminderSchema),
    defaultValues: {
      userId: userId,
      name: "",
      time: "",
      volume: 0,
      isRecurring: false
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

  const onSubmit = (newData: CreateWaterReminderType) => {
    Keyboard.dismiss()

    const finalData = { ...newData, userId }

    // console.log(JSON.stringify(finalData, null, 2))

    addWaterReminder(finalData, {
      onSuccess: () => {
        router.back()
      }
    })
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Thêm nhắc nhở" />

      <Content className="mt-2">
        <VStack center>
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
            minimumDate={new Date(new Date().setHours(0, 0, 0))}
            maximumDate={new Date(new Date().setHours(23, 59, 59))}
          />
        </VStack>

        <VStack gap={32}>
          <VStack gap={12}>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  label="Tên nhắc nhở"
                  placeholder="VD: Uống nước"
                  onChangeText={onChange}
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
                  label="Lượng nước"
                  placeholder="VD: 250"
                  onChangeText={(text) => onChange(parseFloat(text) || 0)}
                  keyboardType="numeric"
                  endIcon={
                    <Text className="font-tregular text-sm text-accent">
                      ml
                    </Text>
                  }
                  canClearText
                  alwaysShowEndIcon
                  errorMessage={errors.volume?.message}
                  className="w-full"
                />
              )}
            />

            <HStack center className="px-1">
              <Text className="flex-1 font-tregular text-lg text-secondary">
                Lặp lại mỗi ngày
              </Text>

              <Controller
                name="isRecurring"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Toggle value={value} onValueChange={onChange} />
                )}
              />
            </HStack>
          </VStack>

          <Button onPress={handleSubmit(onSubmit)}>Tạo nhắc nhở</Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default WaterReminderCreateScreen
