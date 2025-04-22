import React from "react"

import { TouchableOpacity } from "react-native"

import { Circle, CircleCheck } from "lucide-react-native"

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
        <CircleCheck size={20} strokeWidth={2.5} color="#16a34a" />
      ) : (
        <Circle size={20} strokeWidth={2.5} color={COLORS.primary} />
      )}
    </TouchableOpacity>
  )
}
