import React from "react"

import { Text, TouchableOpacity } from "react-native"

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
  const isDisabled = status !== ScheduleTimeSlotStatusEnum.Available

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":")
    return `${hour}h${minute}`
  }

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        "items-center rounded-xl border border-border px-5 py-3",
        isSelected ? "bg-primary" : "bg-card"
      )}
    >
      <Text
        className={cn(
          "font-tmedium text-base",
          isSelected
            ? "text-white"
            : isDisabled
              ? "text-gray-200"
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
