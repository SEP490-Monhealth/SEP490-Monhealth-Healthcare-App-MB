import React, { useRef, useState } from "react"

import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native"
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
import { Header, Section } from "@/components/global/organisms"

import { ScheduleTimeSlots } from "@/components/local/schedules"

import { COLORS } from "@/constants/color"
import { ScheduleTypeEnum } from "@/constants/enum/Schedule"

import { useGetSchedulesByConsultantId } from "@/hooks/useSchedule"

function SchedulesScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const { data: schedulesData, isLoading } =
    useGetSchedulesByConsultantId(consultantId)

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 640

  const [scheduleType, setScheduleType] = useState<ScheduleTypeEnum>(
    ScheduleTypeEnum.OneTime
  )
  const [selectedTime, setSelectedTime] = useState<Date>(new Date())

  const handleScheduleTypeChange = (value: boolean) => {
    const newType = value
      ? ScheduleTypeEnum.Recurring
      : ScheduleTypeEnum.OneTime

    setScheduleType(newType)
  }

  const handleTimeChange = (
    _event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (selectedTime) {
      const hours = selectedTime.getHours()
      const minutes = selectedTime.getMinutes()

      if (hours < 8 || hours > 18 || (hours === 18 && minutes > 0)) {
        const validTime = new Date(selectedTime)
        if (hours < 8) validTime.setHours(8, 0)
        if (hours > 18 || (hours === 18 && minutes > 0))
          validTime.setHours(18, 0)
        setSelectedTime(validTime)
      } else {
        setSelectedTime(selectedTime)
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

  const handleConfirmTime = () => {
    SheetRef.current?.scrollTo(0)
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
                      trackColor={{ false: COLORS.border, true: COLORS.border }}
                      thumbColorTrue={COLORS.primary}
                    />
                  }
                />

                <Section label="Chọn khung giờ" margin={false} />

                <ScheduleTimeSlots
                  data={schedulesData}
                  onOpenTimeSheet={() =>
                    SheetRef.current?.scrollTo(-sheetHeight)
                  }
                />
              </VStack>
            </ScrollArea>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <VStack center>
            <View className="w-full">
              <Input
                value={""}
                label="Thời lượng"
                placeholder="VD: 45"
                onChangeText={() => {}}
                keyboardType="numeric"
                canClearText
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

            <Button size="lg" onPress={handleConfirmTime} className="w-full">
              Xác nhận
            </Button>
          </VStack>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default SchedulesScreen
