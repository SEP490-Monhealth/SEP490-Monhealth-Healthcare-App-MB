import React from "react"

import { View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

import { COLORS } from "@/constants/app"

import { cn } from "@/lib/utils"

interface CircularProgressProps {
  size: number
  width: number
  fill?: number
  tintColor?: string
  backgroundColor?: string
  rotation?: number
  className?: string
}

export const CircularProgress = ({
  size,
  width,
  fill = 0,
  tintColor = COLORS.primary,
  backgroundColor = "#F1F5F9",
  rotation = 90,
  className = ""
}: CircularProgressProps) => {
  return (
    <View className={cn("", className)} testID="CircularProgressContainer">
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        rotation={rotation}
        lineCap="round"
      />
    </View>
  )
}
