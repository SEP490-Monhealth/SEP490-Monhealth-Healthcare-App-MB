import React, { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Button,
  Container,
  Content,
  ScrollArea,
  Toggle,
  VStack
} from "@/components/global/atoms"
import { Header, Section } from "@/components/global/organisms"

import { DaySelector } from "@/components/local/setup/DaySelector"
import { TimeSlotSelector } from "@/components/local/setup/TimeSlotSelector"

import { COLORS } from "@/constants/color"
import { RecurringDayEnum } from "@/constants/enum/RecurringDay"
import { ScheduleTypeEnum } from "@/constants/enum/ScheduleType"

import { useAuth } from "@/contexts/AuthContext"

import {
  CreateScheduleType,
  createScheduleSchema
} from "@/schemas/scheduleSchema"

function SetupSchedule() {
  const { user } = useAuth()
  const userId = user?.userId

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
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<{
    [key: string]: string[]
  }>({})

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
      consultantId: userId,
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

    const schedules = updatedDays.map((day) => ({
      recurringDay: newType === ScheduleTypeEnum.Recurring ? day : null,
      specificDate:
        newType === ScheduleTypeEnum.OneTime
          ? new Date().toISOString().split("T")[0]
          : null,
      timeSlots: updatedTimeSlots[day] || []
    }))

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

      const schedules = updatedDays.map((day) => ({
        recurringDay: scheduleType === ScheduleTypeEnum.Recurring ? day : null,
        specificDate:
          scheduleType === ScheduleTypeEnum.OneTime
            ? new Date().toISOString().split("T")[0]
            : null,
        timeSlots: selectedTimeSlots[day] || []
      }))

      setValue("schedules", schedules)
      return updatedDays
    })
  }

  const toggleTimeSlot = (day: RecurringDayEnum, time: string) => {
    setSelectedTimeSlots((prev) => {
      const updatedSlots = { ...prev }
      if (!updatedSlots[day]) updatedSlots[day] = []

      updatedSlots[day] = updatedSlots[day].includes(time)
        ? updatedSlots[day].filter((t) => t !== time)
        : [...updatedSlots[day], time]

      const schedules = selectedDays.map((day) => ({
        recurringDay: scheduleType === ScheduleTypeEnum.Recurring ? day : null,
        specificDate:
          scheduleType === ScheduleTypeEnum.OneTime
            ? new Date().toISOString().split("T")[0]
            : null,
        timeSlots: updatedSlots[day] || []
      }))

      setValue("schedules", schedules)
      return updatedSlots
    })
  }

  const onSubmit = (data: CreateScheduleType) => {
    setIsLoading(true)

    try {
      console.log("Final Data:", JSON.stringify(data, null, 2))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  // console.log(errors)

  return (
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
              selectedDays={selectedDays}
              selectedTimeSlots={selectedTimeSlots}
              toggleTimeSlot={toggleTimeSlot}
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
  )
}

export default SetupSchedule
