import React, { useState } from "react"

import { Text } from "react-native"

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

  const [time, setTime] = useState(new Date())

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateWaterReminderType>({
    resolver: zodResolver(createWaterReminderSchema),
    defaultValues: {
      userId: userId || "",
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

  const onSubmit = (newWaterReminderData: CreateWaterReminderType) => {
    const finalData = { ...newWaterReminderData, userId }

    // console.log(JSON.stringify(finalData, null, 2))

    addWaterReminder(finalData, {
      onSuccess: () => {
        router.replace("/water-reminders")
      }
    })
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
                    <Text className="font-tregular text-sm text-accent">
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
            Tạo nhắc nhở
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default WaterReminderCreateScreen
