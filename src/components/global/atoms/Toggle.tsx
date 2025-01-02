import React from "react"

import { Switch } from "react-native"

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
  trackColor = { false: "#F5F5F5", true: "#E0F7FA" },
  thumbColorFalse = "#E3F2FD",
  thumbColorTrue = "#B2EBF2"
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
