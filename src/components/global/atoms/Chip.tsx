import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface ChipProps {
  label: string
  onPress?: () => void
  variant?: "default" | "selected"
  size?: "md" | "lg" | "xl"
  border?: boolean
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

const sizeStyles = {
  md: {
    container: "px-3.5 py-1.5 rounded-xl",
    text: "text-base"
  },
  lg: {
    container: "px-6 py-3 rounded-2xl",
    text: "text-base"
  },
  xl: {
    container: "px-6 py-8 rounded-2xl",
    text: "text-xl"
  }
}

const borderStyles = {
  default: {
    border: "border-border",
    text: "text-secondary"
  },
  selected: {
    border: "border-primary",
    text: "text-primary"
  }
}

export const Chip = ({
  label,
  onPress,
  variant = "default",
  size = "md",
  border = false,
  selected = false,
  icon,
  className = ""
}: ChipProps) => {
  const variantStyle = variantStyles[selected ? "selected" : variant]
  const sizeStyle = sizeStyles[size]
  const borderStyle = borderStyles[selected ? "selected" : "default"]

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={cn(
        `flex-row items-center border-2 border-border ${border ? borderStyle.border : variantStyle.container} ${sizeStyle.container}`,
        className
      )}
    >
      {icon && <View className="mr-4">{icon}</View>}
      <Text
        className={`font-tmedium ${
          border ? borderStyle.text : variantStyle.text
        } ${sizeStyle.text}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
