import React from "react"

import { Switch } from "react-native"

import { COLORS } from "@/constants/color"

interface ToggleProps {
  value: boolean
  onValueChange: (value: boolean) => void
  trackColor?: {
    false: string
    true: string
  }
  thumbColorFalse?: string
  thumbColorTrue?: string
}

export const Toggle = ({
  value,
  onValueChange,
  trackColor = { false: COLORS.border, true: COLORS.border },
  thumbColorFalse = "#fff",
  thumbColorTrue = COLORS.primary
}: ToggleProps) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={trackColor}
      thumbColor={value ? thumbColorTrue : thumbColorFalse}
      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
    />
  )
}
