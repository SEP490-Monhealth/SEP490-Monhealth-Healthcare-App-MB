import React from "react"

import { Text, TouchableOpacity } from "react-native"

import { StatusScheduleEnum } from "@/constants/enums"

import { cn } from "@/lib/utils"

interface TimeSlotSelectorProps {
  time: string
  isSelected?: boolean
  status: StatusScheduleEnum
  onPress?: () => void
}

export const TimeSlotSelector = ({
  time,
  isSelected = false,
  status,
  onPress
}: TimeSlotSelectorProps) => {
  const isDisabled = status !== StatusScheduleEnum.Available

  return (
    <TouchableOpacity
      disabled={isDisabled}
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        "items-center rounded-xl border border-border px-6 py-3",
        isSelected ? "bg-primary" : "bg-white"
      )}
    >
      <Text
        className={cn(
          "font-tmedium text-base",
          isSelected
            ? "text-white"
            : isDisabled
              ? "text-gray-300"
              : "text-primary"
        )}
      >
        {time}
      </Text>
    </TouchableOpacity>
  )
}
