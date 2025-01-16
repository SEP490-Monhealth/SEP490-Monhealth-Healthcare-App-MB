import { useEffect, useState } from "react"

import { Text } from "react-native"

import { router, useLocalSearchParams } from "expo-router"

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
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import { useGetWaterReminderById, useUpdateWaterReminder } from "@/hooks/useWaterReminder"

import {
  UpdateWaterReminderType,
  updateWaterReminderSchema
} from "@/schemas/waterReminderSchema"

import { convertTimeStringToDate } from "@/utils/helpers"

function WaterReminderDetailsScreen() {
  const { waterReminderId } = useLocalSearchParams() as {
    waterReminderId: string
  }

  const { mutate: updateWaterReminder } = useUpdateWaterReminder()

  const { data: waterReminderData, isLoading } = useGetWaterReminderById(waterReminderId)

  const [time, setTime] = useState(new Date())

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateWaterReminderType>({
    resolver: zodResolver(updateWaterReminderSchema)
  })

  useEffect(() => {
    if (waterReminderData) {
      setValue("name", waterReminderData.name)
      setValue("time", waterReminderData.time)
      setValue("volume", waterReminderData.volume)
      setTime(convertTimeStringToDate(waterReminderData.time))
    }
  }, [waterReminderData, setValue])

  if (isLoading) {
    return <LoadingScreen />
  }

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

  const onSubmit = (data: UpdateWaterReminderType) => {
    updateWaterReminder(
      { waterReminderId, waterReminder: data },
      {
        onSuccess: () => {
          router.replace("/reminders")
        }
      }
    )
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

export default WaterReminderDetailsScreen
