import React, { useRef, useState } from "react"

import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native"
import { Keyboard } from "react-native"

import { router, useLocalSearchParams } from "expo-router"

import { LoadingScreen } from "@/app/loading"
import { zodResolver } from "@hookform/resolvers/zod"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import { useForm } from "react-hook-form"

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

import { DaySelector, TimeSlotSelector } from "@/components/local/schedules"

import { RecurringDayEnum, ScheduleTypeEnum } from "@/constants/enum/Schedule"

import {
  useCreateSchedule,
  useGetAllScheduleTimeSlots,
  useGetSchedulesByConsultantId
} from "@/hooks/useSchedule"

import {
  CreateScheduleType,
  createScheduleSchema
} from "@/schemas/scheduleSchema"

interface SelectedTimeSlots {
  dayOfWeek: number
  timeSlots: string[]
}

function ScheduleCreateScreen() {
  const { consultantId } = useLocalSearchParams<{ consultantId: string }>()

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 460

  const now = new Date()
  now.setUTCHours(now.getUTCHours() + 7)

  const today = new Date()
  const weekdayNumber = today.getDay()
  const mappedDay = weekdayNumber

  const [scheduleType, setScheduleType] = useState<ScheduleTypeEnum>(
    ScheduleTypeEnum.OneTime
  )
  const [selectedDays, setSelectedDays] = useState<RecurringDayEnum[]>([
    mappedDay
  ])
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    SelectedTimeSlots[]
  >([{ dayOfWeek: mappedDay, timeSlots: [] }])

  const [selectedDay, setSelectedDay] = useState<RecurringDayEnum | null>(null)
  const [selectedTime, setSelectedTime] = useState<Date>(new Date())
  const [duration, setDuration] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const [previousData, setPreviousData] = useState({
    [ScheduleTypeEnum.OneTime]: {
      days: selectedDays,
      timeSlots: selectedTimeSlots
    },
    [ScheduleTypeEnum.Recurring]: {
      days: selectedDays,
      timeSlots: selectedTimeSlots
    }
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { mutate: createSchedule } = useCreateSchedule()

  const { data: scheduleTimeSlotsData, isLoading: isScheduleTimeSlotsLoading } =
    useGetAllScheduleTimeSlots()

  const { data: schedulesData, isLoading: isSchedulesLoading } =
    useGetSchedulesByConsultantId(consultantId, scheduleType)

  // console.log(JSON.stringify(schedulesData, null, 2))

  const {
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateScheduleType>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: {
      consultantId: consultantId,
      type: scheduleType,
      schedules: []
    }
  })

  const handleScheduleTypeChange = (value: boolean) => {
    const newType = value
      ? ScheduleTypeEnum.Recurring
      : ScheduleTypeEnum.OneTime

    setPreviousData((prev) => ({
      ...prev,
      [scheduleType]: { days: selectedDays, timeSlots: selectedTimeSlots }
    }))

    setScheduleType(newType)
    setValue("type", newType)

    const updatedDays = previousData[newType].days
    const updatedTimeSlots = previousData[newType].timeSlots

    setSelectedDays(updatedDays)
    setSelectedTimeSlots(updatedTimeSlots)

    const schedules = updatedDays.map((day) => {
      const dayTimeSlot = updatedTimeSlots.find(
        (slot) => slot.dayOfWeek === day
      )
      return {
        recurringDay: newType === ScheduleTypeEnum.Recurring ? day : null,
        specificDate:
          newType === ScheduleTypeEnum.OneTime
            ? new Date().toISOString().split("T")[0]
            : null,
        timeSlots: dayTimeSlot?.timeSlots || []
      }
    })

    setValue("schedules", schedules)
  }

  const sortDays = (days: RecurringDayEnum[]) => {
    return [...days].sort((a, b) => a - b)
  }

  const toggleDay = (day: RecurringDayEnum) => {
    setSelectedDays((prev) => {
      const updatedDays = prev.includes(day)
        ? prev.filter((d) => d !== day)
        : sortDays([...prev, day])

      if (
        !prev.includes(day) &&
        !selectedTimeSlots.some((slot) => slot.dayOfWeek === day)
      ) {
        setSelectedTimeSlots((currentSlots) => [
          ...currentSlots,
          { dayOfWeek: day, timeSlots: [] }
        ])
      }

      updateSchedulesFormValue(updatedDays, selectedTimeSlots)
      return updatedDays
    })
  }

  const toggleTimeSlot = (day: RecurringDayEnum, time: string) => {
    setSelectedTimeSlots((prevSlots) => {
      const updatedSlots = [...prevSlots]
      const dayIndex = updatedSlots.findIndex((slot) => slot.dayOfWeek === day)

      if (dayIndex === -1) {
        updatedSlots.push({ dayOfWeek: day, timeSlots: [time] })
      } else {
        const currentTimeSlots = [...updatedSlots[dayIndex].timeSlots]
        const timeIndex = currentTimeSlots.indexOf(time)

        if (timeIndex >= 0) {
          currentTimeSlots.splice(timeIndex, 1)
        } else {
          currentTimeSlots.push(time)
        }

        updatedSlots[dayIndex] = {
          ...updatedSlots[dayIndex],
          timeSlots: currentTimeSlots
        }
      }

      updateSchedulesFormValue(selectedDays, updatedSlots)

      return updatedSlots
    })
  }

  const updateSchedulesFormValue = (
    days: RecurringDayEnum[],
    timeSlots: SelectedTimeSlots[]
  ) => {
    const schedules = days.map((day) => {
      const dayTimeSlot = timeSlots.find((slot) => slot.dayOfWeek === day)

      let specificDate = null
      if (scheduleType === ScheduleTypeEnum.OneTime) {
        const today = new Date()
        const currentDay = today.getDay()
        const daysUntilSelectedDay = (day - currentDay + 7) % 7
        const selectedDate = new Date(today)
        selectedDate.setDate(today.getDate() + daysUntilSelectedDay)
        specificDate = selectedDate.toISOString().split("T")[0]
      }

      return {
        recurringDay: scheduleType === ScheduleTypeEnum.Recurring ? day : null,
        specificDate: specificDate,
        timeSlots: dayTimeSlot?.timeSlots || []
      }
    })

    setValue("schedules", schedules)
  }

  const handleOpenTimeSheet = (day: RecurringDayEnum) => {
    setSelectedDay(day)
    SheetRef.current?.scrollTo(-sheetHeight)
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
    if (selectedDay !== null) {
      if (!duration || duration <= 0) {
        setErrorMessage("Vui lòng nhập thời lượng hợp lệ")
        return
      }

      setErrorMessage("")

      const hours = selectedTime.getHours().toString().padStart(2, "0")
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0")

      const endTime = new Date(selectedTime)
      endTime.setMinutes(endTime.getMinutes() + duration)

      if (
        endTime.getHours() > 18 ||
        (endTime.getHours() === 18 && endTime.getMinutes() > 0)
      ) {
        setErrorMessage("Thời gian kết thúc không được vượt quá 18:00")
        return
      }

      const endHours = endTime.getHours().toString().padStart(2, "0")
      const endMinutes = endTime.getMinutes().toString().padStart(2, "0")

      const timeRange = `${hours}:${minutes} - ${endHours}:${endMinutes}`

      const daySlot = selectedTimeSlots.find(
        (slot) => slot.dayOfWeek === selectedDay
      )

      const hasOverlap = daySlot?.timeSlots.some((existingSlot) => {
        const [existingStart, existingEnd] = existingSlot.split(" - ")
        const [newStart, newEnd] = timeRange.split(" - ")

        return (
          (newStart >= existingStart && newStart < existingEnd) ||
          (newEnd > existingStart && newEnd <= existingEnd) ||
          (newStart <= existingStart && newEnd >= existingEnd)
        )
      })

      // if (hasOverlap) {
      //   setErrorMessage("Khung giờ này đã bị trùng lặp với khung giờ khác")
      //   return
      // }

      if (!daySlot?.timeSlots.includes(timeRange)) {
        toggleTimeSlot(selectedDay, timeRange)
      }

      setErrorMessage("")
      setDuration(0)
      setSelectedTime(new Date())
      SheetRef.current?.scrollTo(0)
    }
  }

  const onSubmit = async (data: CreateScheduleType) => {
    Keyboard.dismiss()
    setIsLoading(true)

    try {
      const formattedData = {
        ...data,
        schedules: data.schedules.map((schedule) => ({
          ...schedule,
          timeSlots: schedule.timeSlots.map((timeSlot) => {
            if (timeSlot.includes(" - ")) {
              const [startTime, endTime] = timeSlot.split(" - ")
              return `${startTime}:00 - ${endTime}:00`
            }
            if (timeSlot.length === 5) {
              return timeSlot + ":00"
            }
            return timeSlot
          })
        }))
      }

      // console.log("Formatted Data:", JSON.stringify(formattedData, null, 2))

      await createSchedule(formattedData, {
        onSuccess: () => {
          router.replace(`/schedules/consultant/${consultantId}`)
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const hasSelectedTimeSlots = selectedTimeSlots.some(
    (slot) => slot.timeSlots.length > 0
  )

  // console.log(errors)

  if (
    !scheduleTimeSlotsData ||
    isScheduleTimeSlotsLoading ||
    !schedulesData ||
    isSchedulesLoading
  ) {
    return <LoadingScreen />
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <Header back label="Tạo lịch trình" />

          <Content className="mt-2 pb-4">
            <ScrollArea className="flex-1">
              <VStack className="pb-24">
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

                <Section label="Chọn ngày" margin={false} />

                <DaySelector
                  selectedDays={selectedDays}
                  toggleDay={toggleDay}
                  scheduleType={scheduleType}
                  existingSchedules={schedulesData}
                  setSelectedDays={setSelectedDays}
                />

                <Section label="Chọn khung giờ" />

                <TimeSlotSelector
                  data={scheduleTimeSlotsData}
                  selectedDays={selectedDays}
                  selectedTimeSlots={selectedTimeSlots}
                  toggleTimeSlot={toggleTimeSlot}
                  onOpenTimeSheet={handleOpenTimeSheet}
                  existingSchedules={schedulesData}
                />
              </VStack>
            </ScrollArea>

            <Button
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              className="absolute bottom-4 w-full"
            >
              Hoàn thành
            </Button>
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

            <Button
              disabled={!hasSelectedTimeSlots}
              onPress={handleConfirmTime}
              className="w-full"
            >
              Xác nhận
            </Button>
          </VStack>
        </Sheet>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default ScheduleCreateScreen
