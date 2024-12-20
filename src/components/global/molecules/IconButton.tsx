import React from "react"

import { TouchableOpacity } from "react-native"

import { cn } from "@/lib/utils"

interface IconButtonProps {
  size?: "sm" | "md"
  icon: React.ReactNode
  onPress?: () => void
  className?: string
}

export const IconButton = ({
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
      activeOpacity={0.7}
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
