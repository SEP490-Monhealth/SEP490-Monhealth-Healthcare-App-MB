import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface StackProps {
  children: React.ReactNode
  gap?: number
  center?: boolean
  className?: string
}

export const VStack: React.FC<StackProps> = ({
  children,
  gap = 4,
  center = false,
  className = ""
}) => {
  return (
    <View
      className={cn("flex flex-col", center ? "items-center" : "", className)}
      style={{ gap }}
    >
      {children}
    </View>
  )
}

export const HStack: React.FC<StackProps> = ({
  children,
  gap = 4,
  center = false,
  className = ""
}) => {
  return (
    <View
      className={cn("flex flex-row", center ? "items-center" : "", className)}
      style={{ gap }}
    >
      {children}
    </View>
  )
}
