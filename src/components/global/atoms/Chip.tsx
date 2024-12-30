import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface ChipProps {
  label: string
  description?: string
  onPress?: () => void
  variant?: "default" | "selected" | "yellow"
  size?: "sm" | "md" | "lg"
  border?: boolean
  borderWidth?: number
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
  },
  yellow: {
    container: "bg-yellow-400",
    text: "text-gray-700"
  }
}

const sizeStyles = {
  sm: {
    container: "px-3.5 py-1.5 rounded-xl",
    text: "text-base"
  },
  md: {
    container: "px-6 py-3 rounded-2xl",
    text: "text-base"
  },
  lg: {
    container: "px-6 py-6 rounded-2xl",
    text: "text-lg"
  }
}

const borderStyles = {
  default: {
    border: "border-border",
    text: "text-accent"
  },
  selected: {
    border: "border-primary",
    text: "text-primary"
  }
}

export const Chip = ({
  label,
  description,
  onPress,
  variant = "default",
  size = "sm",
  border = false,
  borderWidth = 1,
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
        `flex-row items-center ${
          border ? borderStyle.border : variantStyle.container
        } ${sizeStyle.container}`,
        className
      )}
      style={border && { borderWidth }}
    >
      {icon && <View className="mr-4">{icon}</View>}

      <View className="flex-col justify-start">
        <Text
          className={`font-tmedium ${
            border ? borderStyle.text : variantStyle.text
          } ${sizeStyle.text}`}
        >
          {label}
        </Text>

        {description && (
          <Text
            className={`font-tmedium text-sm text-accent ${
              border ? borderStyle.text : variantStyle.text
            } `}
          >
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}
