import React from "react"

import { Text, TouchableOpacity } from "react-native"

import { formatTimeAMandPM } from "@/utils/formatters"

import { HStack } from "../atoms"

interface TimeSelectorCardProps {
  time: string
  status: string
  isSelected?: boolean
  onPress?: () => void
}

const backgroundStyles = {
  default: "#FFF",
  selected: "#334155"
}

const textStyles = {
  default: "#94A3B8",
  selected: "#FFF"
}

export const TimeSelectorCard = ({
  time,
  status,
  isSelected = false,
  onPress
}: TimeSelectorCardProps) => {
  const isDisabled = status != "Available"
  const opacity = isDisabled ? 0.4 : 1

  const backgroundColor = backgroundStyles[isSelected ? "selected" : "default"]
  const textColor = textStyles[isSelected ? "selected" : "default"]

  const formattedTime = formatTimeAMandPM(time)

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
      style={{ opacity, backgroundColor }}
      className="w-32 items-center rounded-xl border border-border py-4"
    >
      <HStack center>
        <Text className="font-tmedium text-base" style={{ color: textColor }}>
          {formattedTime}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
