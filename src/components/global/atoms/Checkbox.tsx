import React from "react"

import { TouchableOpacity, View } from "react-native"

import { COLORS } from "@/constants/color"

interface CheckboxProps {
  size?: number
  checked?: boolean
  borderColor?: string
  backgroundColor?: string
  activeBackgroundColor?: string
  innerCircleColor?: string
  onCheckChange?: (checked: boolean) => void
}

export const Checkbox = ({
  size = 24,
  checked = false,
  borderColor = COLORS.secondary,
  backgroundColor = "#fff",
  activeBackgroundColor = "#fff",
  innerCircleColor = COLORS.primary,
  onCheckChange
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onCheckChange?.(!checked)}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderWidth: checked ? 1.8 : 2,
        borderColor: borderColor,
        backgroundColor: checked ? activeBackgroundColor : backgroundColor
      }}
      className="items-center justify-center"
    >
      {checked && (
        <View
          style={{
            height: size / 2,
            width: size / 2,
            borderRadius: size / 4,
            backgroundColor: innerCircleColor
          }}
        />
      )}
    </TouchableOpacity>
  )
}
