import React from "react"

import { TouchableOpacity } from "react-native"

import { cn } from "@/lib/utils"

interface IconButtonProps {
  testID?: string
  size?: "sm" | "md"
  icon: React.ReactNode
  onPress?: () => void
  className?: string
}

export const IconButton = ({
  testID,
  size = "md",
  icon,
  onPress,
  className = ""
}: IconButtonProps) => {
  const sizes = {
    sm: "h-10 w-10",
    md: "h-12 w-12"
  }

  const sizeClass = sizes[size]

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.8}
      onPress={onPress}
      className={cn(
        "flex items-center justify-center rounded-full bg-muted",
        sizeClass,
        className
      )}
    >
      {icon}
    </TouchableOpacity>
  )
}
