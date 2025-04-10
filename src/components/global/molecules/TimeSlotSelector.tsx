import React from "react"

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
}

export const TimeSlotSelector = ({
  startTime,
  endTime,
  isSelected = false,
  status,
  onPress
}: TimeSlotSelectorProps) => {
  const isBooked = status === ScheduleTimeSlotStatusEnum.Booked
  const isDisabled = status === ScheduleTimeSlotStatusEnum.Unavailable

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":")
    return `${hour}h${minute}`
  }

  return (
    <TouchableOpacity
      disabled={isBooked || isDisabled}
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        "items-center rounded-xl border border-border px-5 py-3",
        isSelected || isDisabled ? "" : "bg-card"
      )}
      style={
        isSelected
          ? { backgroundColor: COLORS.primary }
          : isBooked
            ? { backgroundColor: "#facc15" }
            : isDisabled
              ? { backgroundColor: COLORS.muted }
              : {}
      }
    >
      <Text
        className={cn(
          "font-tmedium text-base",
          isSelected
            ? "text-white"
            : isDisabled
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
