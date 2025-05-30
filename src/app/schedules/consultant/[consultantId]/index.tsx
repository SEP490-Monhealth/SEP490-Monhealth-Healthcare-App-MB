import React, { useRef, useState } from "react"

import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { Keyboard } from "react-native"

import { useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { Add } from "iconsax-react-native"

import {
  Button,
  Container,
  Content,
  Input,
  ScrollArea,
  Sheet,
  SheetRefProps,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { ErrorDisplay } from "@/components/global/molecules"
import { Header, Section } from "@/components/global/organisms"

import { ScheduleTimeSlots } from "@/components/local/schedules"

import { COLORS } from "@/constants/color"
import { ScheduleTypeEnum } from "@/constants/enum/Schedule"

import { useGetSchedulesByConsultantId } from "@/hooks/useSchedule"
import { useCreateTimeSlot } from "@/hooks/useTimeSlot"

function SchedulesScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 460

  const getDefaultTime = (): Date => {
    const now = new Date()
    now.setHours(18, 0, 0, 0)
    return now
  }

  const [scheduleType, setScheduleType] = useState<ScheduleTypeEnum>(
    ScheduleTypeEnum.OneTime
  )
  const [selectedTime, setSelectedTime] = useState<Date>(getDefaultTime)
  const [duration, setDuration] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [currentScheduleId, setCurrentScheduleId] = useState<string>("")

  const { mutate: createTimeSlot } = useCreateTimeSlot()

  const { data: schedulesData, isLoading } = useGetSchedulesByConsultantId(
    consultantId,
    scheduleType
  )

  const handleScheduleTypeChange = (value: boolean) => {
    const newType = value
      ? ScheduleTypeEnum.Recurring
      : ScheduleTypeEnum.OneTime
    setScheduleType(newType)
  }

  const handleTimeChange = (
    _event: DateTimePickerEvent,
    selectedTimeValue?: Date
  ) => {
    if (selectedTimeValue) {
      const hours = selectedTimeValue.getHours()
      const minutes = selectedTimeValue.getMinutes()

      if (hours < 8 || hours > 18 || (hours === 18 && minutes > 0)) {
        const validTime = new Date(selectedTimeValue)
        if (hours < 8) validTime.setHours(8, 0)
        if (hours > 18 || (hours === 18 && minutes > 0))
          validTime.setHours(18, 0)
        setSelectedTime(validTime)
      } else {
        setSelectedTime(selectedTimeValue)
      }
    }
  }

  const setHoursAndMinutes = (
    date: Date,
    hours: number,
    minutes: number
  ): Date => {
    const newDate = new Date(date)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    return newDate
  }

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}:00`
  }

  const handleOpenTimeSheet = (scheduleId: string | null) => {
    setCurrentScheduleId(scheduleId || "")
    SheetRef.current?.scrollTo(-sheetHeight)
  }

  const timeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(":").map(Number)
    return hours * 60 + minutes
  }

  const checkTimeSlotOverlap = (
    newStartTime: string,
    newEndTime: string,
    existingTimeSlots: { startTime: string; endTime: string }[]
  ): boolean => {
    const newStart = timeToMinutes(newStartTime.substring(0, 5))
    const newEnd = timeToMinutes(newEndTime.substring(0, 5))

    for (const slot of existingTimeSlots) {
      const existingStart = timeToMinutes(slot.startTime.substring(0, 5))
      const existingEnd = timeToMinutes(slot.endTime.substring(0, 5))

      if (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      ) {
        return true
      }
    }
    return false
  }

  const handleConfirmTime = async () => {
    setErrorMessage("")

    if (duration <= 0) {
      setErrorMessage(
        "Thời lượng không hợp lệ, vui lòng nhập số phút lớn hơn 0!"
      )
      return
    }

    if (duration < 45) {
      setErrorMessage("Thời lượng tối thiểu phải là 45 phút")
      return
    }

    if (duration > 120) {
      setErrorMessage("Thời lượng tối đa phải là 120 phút")
      return
    }

    const startTime = selectedTime
    const endTime = new Date(selectedTime.getTime() + duration * 60 * 1000)

    const formattedStartTime = formatTime(startTime)
    const formattedEndTime = formatTime(endTime)

    const currentSchedule = schedulesData?.find(
      (schedule) => schedule.scheduleId === currentScheduleId
    )

    if (currentSchedule) {
      const hasOverlap = checkTimeSlotOverlap(
        formattedStartTime,
        formattedEndTime,
        currentSchedule.timeSlots
      )

      if (hasOverlap) {
        setErrorMessage(
          "Khung giờ này đã trùng hoặc xen kẽ với khung giờ hiện có!"
        )
        return
      }
    }

    const finalData = {
      scheduleId: currentScheduleId,
      startTime: formattedStartTime,
      endTime: formattedEndTime
    }

    await createTimeSlot(finalData, {
      onSuccess: () => {
        setSelectedTime(getDefaultTime())
        setDuration(0)
        setCurrentScheduleId("")
        SheetRef.current?.scrollTo(0)
      }
    })
  }

  if (!schedulesData || isLoading) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header
            back
            label="Lịch trình"
            action={{
              icon: <Add size={24} color={COLORS.primary} />,
              href: `/schedules/consultant/${consultantId}/create`
            }}
          />

          <Content className="mt-2">
            <ScrollArea className="flex-1">
              <VStack>
                <Section
                  label="Lặp lại"
                  margin={false}
                  action={
                    <Toggle
                      value={scheduleType === ScheduleTypeEnum.Recurring}
                      onValueChange={handleScheduleTypeChange}
                    />
                  }
                />

                {schedulesData && schedulesData.length > 0 && (
                  <Section label="Chọn khung giờ" margin={false} />
                )}

                {schedulesData && schedulesData.length > 0 ? (
                  <ScheduleTimeSlots
                    data={schedulesData}
                    scheduleType={scheduleType}
                    onOpenTimeSheet={handleOpenTimeSheet}
                  />
                ) : (
                  <ErrorDisplay
                    imageSource={require("../../../../../public/images/monhealth-no-data-image.png")}
                    title="Không có lịch trình"
                    description="Không tìm thấy có lịch trình nào ở đây!"
                    marginTop={24}
                  />
                )}
              </VStack>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <VStack center>
            <View className="w-full">
              <Input
                value={duration ? duration.toString() : ""}
                label="Thời lượng"
                placeholder="VD: 45"
                onChangeText={(text) => setDuration(parseFloat(text) || 0)}
                keyboardType="numeric"
                endIcon={
                  <Text className="font-tregular text-sm text-accent">
                    phút
                  </Text>
                }
                canClearText
                errorMessage={errorMessage}
              />
            </View>

            <DateTimePicker
              value={selectedTime}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
              minuteInterval={15}
              minimumDate={setHoursAndMinutes(new Date(), 8, 0)}
              maximumDate={setHoursAndMinutes(new Date(), 18, 0)}
            />

            <Button onPress={handleConfirmTime} className="w-full">
              Xác nhận
            </Button>
          </VStack>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SchedulesScreen
