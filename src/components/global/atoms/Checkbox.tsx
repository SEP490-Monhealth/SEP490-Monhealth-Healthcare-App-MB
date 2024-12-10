import React from "react"

import { TouchableOpacity, View } from "react-native"

interface CheckboxProps {
  size?: number
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
  borderColor?: string
  backgroundColor?: string
  activeBackgroundColor?: string
  innerCircleColor?: string
}

export const Checkbox = ({
  size = 24,
  checked = false,
  onCheckChange,
  borderColor = "border-primary",
  backgroundColor = "bg-transparent",
  activeBackgroundColor = "bg-primary",
  innerCircleColor = "bg-white"
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onCheckChange?.(!checked)}
      className={`items-center justify-center rounded-full border-2 ${borderColor} ${
        checked ? activeBackgroundColor : backgroundColor
      }`}
      style={{ height: size, width: size }}
    >
      {checked && (
        <View
          className={`rounded-full ${innerCircleColor}`}
          style={{ height: size / 2, width: size / 2 }}
        />
      )}
    </TouchableOpacity>
  )
}
