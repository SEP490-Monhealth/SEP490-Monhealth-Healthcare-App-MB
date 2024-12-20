import React from "react"

import { TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface StackProps {
  gap?: number
  center?: boolean
  onPress?: () => void
  className?: string
  children: React.ReactNode
  testID?: string
}

export const VStack: React.FC<StackProps> = ({
  gap = 4,
  center = false,
  onPress,
  className = "",
  children,
  testID
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      disabled={!onPress}
      testID={testID}
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
  children,
  gap = 4,
  center = false,
  onPress,
  className = "",
  testID
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      disabled={!onPress}
      testID={testID}
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
