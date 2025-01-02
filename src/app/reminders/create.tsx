import React, { useState } from "react"

import { Switch, Text, View } from "react-native"

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

import { ListItem } from "@/components/local/tabs/profile"

import { WaterCreateType, waterCreateSchema } from "@/schemas/waterSchema"

function ReminderCreateScreen() {
  const [time, setTime] = useState(new Date())
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled((prev) => {
      setValue("status", !prev)
      return !prev
    })
  }

  const defaultIntakeTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })

  const onChange = (_event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime)
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
      setValue("intakeTime", formattedTime)
    }
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<WaterCreateType>({
    resolver: zodResolver(waterCreateSchema),
    defaultValues: {
      name: "",
      volume: 0,
      intakeTime: defaultIntakeTime,
      status: false
    }
  })

  const onSubmit = (data: WaterCreateType) => {
    console.log("Submitted Data:", data)
  }

  return (
    <Container dismissKeyboard>
      <Header back label="Thêm thông báo" />

      <Content>
        <VStack center gap={20}>
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onChange}
          />

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Nhập tên gợi nhớ"
                onChangeText={onChange}
                keyboardType="default"
                errorMessage={errors.name?.message}
                canClearText
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
                className="w-full"
                errorMessage={errors.volume?.message}
              />
            )}
          />

          <View className="w-full px-1">
            <ListItem
              label="Bật thông báo"
              endIcon={
                <Switch value={isEnabled} onValueChange={toggleSwitch} />
              }
              more={false}
            />
            {isEnabled && (
              <Text className="mt-2 text-base text-accent">
                Thông báo đã được bật, bạn sẽ nhận các nhắc nhở hàng ngày.
              </Text>
            )}
          </View>
        </VStack>
      </Content>

      <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
        Tạo thông báo
      </Button>
    </Container>
  )
}

export default ReminderCreateScreen
