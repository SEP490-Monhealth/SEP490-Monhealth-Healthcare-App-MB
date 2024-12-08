import React from "react"

import { TouchableOpacity } from "react-native"

import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  onPress?: () => void
  className?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  className = ""
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={cn("rounded-2xl bg-white px-6 py-4", className)}
    >
      <React.Fragment>{children}</React.Fragment>
    </TouchableOpacity>
  )
}
