import React, { useRef, useState } from "react"

import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native"
import { Keyboard } from "react-native"

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
  ScrollArea,
  Sheet,
  SheetRefProps,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { DaySelector } from "@/components/local/setup/DaySelector"
import { TimeSlotSelector } from "@/components/local/setup/TimeSlotSelector"

import { COLORS } from "@/constants/color"
import { RecurringDayEnum, ScheduleTypeEnum } from "@/constants/enum/Schedule"

import { useAuth } from "@/contexts/AuthContext"

import {
  useCreateSchedule,
  useGetAllScheduleTimeSlots
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
  const { user } = useAuth()
  const consultantId = user?.consultantId

  const { mutate: createSchedule } = useCreateSchedule()

  const { data: scheduleTimeSlotsData, isLoading: isScheduleTimeSlotsLoading } =
    useGetAllScheduleTimeSlots()

  const SheetRef = useRef<SheetRefProps>(null)
  const sheetHeight = 480

  const now = new Date()
  now.setUTCHours(now.getUTCHours() + 7)

  const today = now.getDay()
  const mappedDay = today === 0 ? 6 : today - 1

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

      const schedules = updatedDays.map((day) => {
        const dayTimeSlot = selectedTimeSlots.find(
          (slot) => slot.dayOfWeek === day
        )
        return {
          recurringDay:
            scheduleType === ScheduleTypeEnum.Recurring ? day : null,
          specificDate:
            scheduleType === ScheduleTypeEnum.OneTime
              ? new Date().toISOString().split("T")[0]
              : null,
          timeSlots: dayTimeSlot?.timeSlots || []
        }
      })

      setValue("schedules", schedules)
      return updatedDays
    })
  }

  const toggleTimeSlot = (day: RecurringDayEnum, time: string) => {
    setSelectedTimeSlots((prevSlots) => {
      const dayIndex = prevSlots.findIndex((slot) => slot.dayOfWeek === day)
      const updatedSlots = [...prevSlots]

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

      const schedules = selectedDays.map((day) => {
        const dayTimeSlot = updatedSlots.find((slot) => slot.dayOfWeek === day)
        return {
          recurringDay:
            scheduleType === ScheduleTypeEnum.Recurring ? day : null,
          specificDate:
            scheduleType === ScheduleTypeEnum.OneTime
              ? new Date().toISOString().split("T")[0]
              : null,
          timeSlots: dayTimeSlot?.timeSlots || []
        }
      })

      setValue("schedules", schedules)
      return updatedSlots
    })
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
      const hours = selectedTime.getHours().toString().padStart(2, "0")
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0")

      const timeString = `${hours}:${minutes}:00`

      // console.log(`Selected time for day ${selectedDay}: ${timeString}`)

      const daySlot = selectedTimeSlots.find(
        (slot) => slot.dayOfWeek === selectedDay
      )
      if (!daySlot?.timeSlots.includes(timeString)) {
        toggleTimeSlot(selectedDay, timeString)
      }

      SheetRef.current?.scrollTo(0)
    }
  }

  const onSubmit = async (data: CreateScheduleType) => {
    setIsLoading(true)

    try {
      // console.log("Final Data:", JSON.stringify(data, null, 2))

      await createSchedule(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // console.log(errors)

  if (!scheduleTimeSlotsData || isScheduleTimeSlotsLoading)
    return <LoadingScreen />

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
                      trackColor={{ false: COLORS.border, true: COLORS.border }}
                      thumbColorTrue={COLORS.primary}
                    />
                  }
                />

                <Section label="Chọn ngày" margin={false} />

                <DaySelector
                  selectedDays={selectedDays}
                  toggleDay={toggleDay}
                  scheduleType={scheduleType}
                />

                <Section label="Chọn khung giờ" />

                <TimeSlotSelector
                  data={scheduleTimeSlotsData}
                  selectedDays={selectedDays}
                  selectedTimeSlots={selectedTimeSlots}
                  toggleTimeSlot={toggleTimeSlot}
                  onOpenTimeSheet={handleOpenTimeSheet}
                />
              </VStack>
            </ScrollArea>

            <Button
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
              size="lg"
              className="absolute bottom-4 w-full"
            >
              Hoàn thành
            </Button>
          </Content>
        </Container>

        <Sheet ref={SheetRef} dynamicHeight={sheetHeight}>
          <VStack center>
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

export default ScheduleCreateScreen
