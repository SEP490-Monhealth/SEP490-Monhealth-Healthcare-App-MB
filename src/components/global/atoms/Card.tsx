import React from "react"

import { TouchableOpacity } from "react-native"

import { cn } from "@/lib/utils"

interface CardProps {
  testID?: string
  activeOpacity?: number
  className?: string
  onPress?: () => void
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  testID,
  activeOpacity = 0.7,
  className = "",
  onPress,
  children
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-6 py-4",
        className
      )}
    >
      <React.Fragment>{children}</React.Fragment>
    </TouchableOpacity>
  )
}
