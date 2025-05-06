import React, { useMemo } from "react"

import { Text, TouchableOpacity } from "react-native"

import { COLORS } from "@/constants/color"
import { ScheduleTimeSlotStatusEnum } from "@/constants/enum/Schedule"

import { cn } from "@/lib/utils"

interface TimeSlotSelectorProps {
  startTime: string
  endTime: string
  isSelected?: boolean
  status: ScheduleTimeSlotStatusEnum
  onPress?: () => void
  date: string
  bufferMinutes?: number
}

export const TimeSlotSelector = ({
  startTime,
  endTime,
  isSelected = false,
  status,
  onPress,
  date,
  bufferMinutes = 20
}: TimeSlotSelectorProps) => {
  const isBooked = status === ScheduleTimeSlotStatusEnum.Booked
  const isDisabled = status === ScheduleTimeSlotStatusEnum.Unavailable

  const isTimeSlotInvalid = useMemo(() => {
    if (isBooked) return false

    const now = new Date()

    const [hours, minutes] = startTime.split(":").map(Number)
    const slotDateTime = new Date(date)
    slotDateTime.setHours(hours, minutes, 0, 0)

    const bufferTime = new Date(slotDateTime.getTime())
    bufferTime.setMinutes(bufferTime.getMinutes() - bufferMinutes)

    return now > bufferTime
  }, [date, startTime, bufferMinutes])

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":")
    return `${hour}h${minute}`
  }

  return (
    <TouchableOpacity
      disabled={isBooked || isDisabled || isTimeSlotInvalid}
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        "items-center rounded-xl border border-border px-5 py-3",
        isSelected || isDisabled || isTimeSlotInvalid ? "" : "bg-card"
      )}
      style={
        isSelected
          ? { backgroundColor: COLORS.primary }
          : isBooked
            ? { backgroundColor: "#facc15" }
            : isDisabled || isTimeSlotInvalid
              ? { backgroundColor: "#f3f4f6" }
              : {}
      }
    >
      <Text
        className={cn(
          "font-tmedium text-base",
          isSelected
            ? "text-white"
            : isDisabled || isTimeSlotInvalid
              ? "text-accent"
              : "text-primary"
        )}
      >
        {isSelected
          ? `${formatTime(startTime)} - ${formatTime(endTime)}`
          : formatTime(startTime)}
      </Text>
    </TouchableOpacity>
  )
}
