import React from "react"

import { TouchableOpacity } from "react-native"

import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  activeOpacity?: number
  onPress?: () => void
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  activeOpacity = 0.7,
  className = ""
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={cn("w-full rounded-2xl bg-card px-6 py-4", className)}
    >
      <React.Fragment>{children}</React.Fragment>
    </TouchableOpacity>
  )
}
