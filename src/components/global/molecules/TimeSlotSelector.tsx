import React from "react"

import { Text, TouchableOpacity } from "react-native"

import { COLORS } from "@/constants/color"
import { StatusScheduleEnum } from "@/constants/enums"

import { formatTimeAMandPM } from "@/utils/formatters"

import { HStack } from "../atoms"

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
      onPress={onPress}
      style={{
        opacity: isDisabled ? 0.4 : 1,
        backgroundColor: isSelected ? COLORS.primary : "#FFF"
      }}
      className="w-32 items-center rounded-xl border border-border py-4"
    >
      <HStack center>
        <Text
          className="font-tmedium text-base"
          style={{ color: isSelected ? "#FFF" : COLORS.accent }}
        >
          {formatTimeAMandPM(time)}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
