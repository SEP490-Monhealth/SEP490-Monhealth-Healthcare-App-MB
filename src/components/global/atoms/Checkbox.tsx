import React from "react"

import { TouchableOpacity } from "react-native"

import { Feather } from "@expo/vector-icons"

import { COLORS } from "@/constants/color"

interface CheckboxProps {
  checked?: boolean
  onCheckChange?: (checked: boolean) => void
}

export const Checkbox = ({ checked = false, onCheckChange }: CheckboxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onCheckChange?.(!checked)}
    >
      {checked ? (
        <Feather
          name="check-circle"
          size={20}
          strokeWidth={2.5}
          color={COLORS.primary}
        />
      ) : (
        <Feather
          name="circle"
          size={20}
          strokeWidth={2.5}
          color={COLORS.primary}
        />
      )}
    </TouchableOpacity>
  )
}
