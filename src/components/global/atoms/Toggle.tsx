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
  trackColor = { false: "#38bdf8", true: "#0ea5e9" },
  thumbColorFalse = "#f1f5f9",
  thumbColorTrue = "#f8fafc"
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
