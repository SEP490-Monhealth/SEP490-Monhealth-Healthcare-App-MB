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
  HStack,
  Input,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { Header } from "@/components/global/organisms"

import {
  useGetWaterReminderById,
  useUpdateWaterReminder
} from "@/hooks/useWaterReminder"

import {
  UpdateWaterReminderType,
  updateWaterReminderSchema
} from "@/schemas/waterReminderSchema"

import { convertDate } from "@/utils/helpers"

function WaterReminderDetailsScreen() {
  const { waterReminderId } = useLocalSearchParams() as {
    waterReminderId: string
  }

  const { mutate: updateWaterReminder } = useUpdateWaterReminder()

  const { data: waterReminderData, isLoading } =
    useGetWaterReminderById(waterReminderId)

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
      setValue("isRecurring", waterReminderData.isRecurring)
      setTime(convertDate(waterReminderData.time))
    }
  }, [waterReminderData, setValue])

  if (!waterReminderData || isLoading) <LoadingScreen />

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
      { waterReminderId, updatedData: data },
      {
        onSuccess: () => {
          router.back()
        }
      }
    )
  }
  return (
    <Container dismissKeyboard>
      <Header back label="Chỉnh sửa nhắc nhở" />

      <Content className="mt-2">
        <VStack center>
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
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

          <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Cập nhật
          </Button>
        </VStack>
      </Content>
    </Container>
  )
}

export default WaterReminderDetailsScreen
