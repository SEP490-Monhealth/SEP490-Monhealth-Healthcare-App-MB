import React from "react"

import { TouchableOpacity } from "react-native"
import { Text } from "react-native"

import { cn } from "@/lib/utils"

interface CardProps {
  testID?: string
  activeOpacity?: number
  hasImage?: boolean
  className?: string
  onPress?: () => void
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  testID,
  activeOpacity = 0.8,
  hasImage = false,
  className = "",
  onPress,
  children
}) => {
  const paddingClass = hasImage ? "p-4" : "px-6 py-4"

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onPress}
      className={cn(
        "w-full rounded-2xl border border-border bg-card",
        paddingClass,
        className
      )}
    >
      <React.Fragment>{children}</React.Fragment>
    </TouchableOpacity>
  )
}

interface CardHeaderProps {
  label: string
}

export const CardHeader = ({ label }: CardHeaderProps) => {
  return <Text className="font-tmedium text-lg text-primary">{label}</Text>
}
