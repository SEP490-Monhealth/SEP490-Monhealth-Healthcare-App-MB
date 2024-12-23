import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface ChipProps {
  label: string
  onPress?: () => void
  variant?: "default" | "selected"
  selected?: boolean
  icon?: React.ReactNode
  className?: string
}

const variantStyles = {
  default: {
    container: "bg-muted",
    text: "text-primary"
  },
  selected: {
    container: "bg-primary",
    text: "text-white"
  }
}

export const Chip = ({
  label,
  onPress,
  variant = "default",
  selected = false,
  icon,
  className = ""
}: ChipProps) => {
  const styles = variantStyles[selected ? "selected" : variant]

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        `flex-row items-center rounded-xl border border-border px-4 py-1.5 ${styles.container}`,
        className
      )}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={`font-tmedium text-sm ${styles.text}`}>{label}</Text>
    </TouchableOpacity>
  )
}
