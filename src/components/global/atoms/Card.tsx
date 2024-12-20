import React from "react"

import { TouchableOpacity } from "react-native"

import { cn } from "@/lib/utils"

interface CardProps {
  activeOpacity?: number
  className?: string
  onPress?: () => void
  children: React.ReactNode
  testID?: string
}

export const Card: React.FC<CardProps> = ({
  activeOpacity = 0.7,
  className = "",
  onPress,
  children,
  testID
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={cn(
        "w-full rounded-2xl border border-border bg-card px-6 py-4",
        className
      )}
      testID={testID}
    >
      <React.Fragment>{children}</React.Fragment>
    </TouchableOpacity>
  )
}
