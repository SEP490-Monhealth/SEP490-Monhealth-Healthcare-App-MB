import React from "react"

import { View } from "react-native"

import { cn } from "@/lib/utils"

interface StackProps {
  children: React.ReactNode
  gap?: number
  className?: string
}

export const VStack: React.FC<StackProps> = ({
  children,
  gap = 4,
  className = ""
}) => {
  return (
    <View className={cn("flex flex-col", className)} style={{ gap }}>
      {children}
    </View>
  )
}

export const HStack: React.FC<StackProps> = ({
  children,
  gap = 4,
  className = ""
}) => {
  return (
    <View className={cn("flex flex-row", className)} style={{ gap }}>
      {children}
    </View>
  )
}
