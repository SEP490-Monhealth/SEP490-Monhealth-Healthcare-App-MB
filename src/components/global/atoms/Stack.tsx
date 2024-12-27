import React from "react"

import { TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface StackProps {
  testID?: string
  gap?: number
  center?: boolean
  onPress?: () => void
  className?: string
  children: React.ReactNode
}

export const VStack: React.FC<StackProps> = ({
  testID,
  gap = 4,
  center = false,
  onPress,
  className = "",
  children
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={1}
      onPress={onPress}
      disabled={!onPress}
    >
      <View
        className={cn("flex flex-col", center ? "items-center" : "", className)}
        style={{ gap }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

export const HStack: React.FC<StackProps> = ({
  testID,
  children,
  gap = 4,
  center = false,
  onPress,
  className = ""
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={1}
      onPress={onPress}
      disabled={!onPress}
    >
      <View
        className={cn("flex flex-row", center ? "items-center" : "", className)}
        style={{ gap }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}
