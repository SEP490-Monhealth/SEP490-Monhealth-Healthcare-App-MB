import React, { useEffect, useRef } from "react"

import { Animated, Text, View } from "react-native"

import { COLORS } from "@/constants/app"

import { cn } from "@/lib/utils"

interface ProgressProps {
  testID?: string
  progress: number
  height?: number
  color?: string
  labelStart?: string
  labelEnd?: string
  className?: string
}

export const Progress = ({
  testID,
  progress,
  height = 10,
  color = COLORS.primary,
  labelStart = "",
  labelEnd = "",
  className = ""
}: ProgressProps) => {
  const animatedWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(progress, 100))
    Animated.timing(animatedWidth, {
      toValue: clampedProgress,
      duration: 500,
      useNativeDriver: false
    }).start()
  }, [progress])

  return (
    <View testID={testID} className={cn("w-full", className)}>
      <View className="w-full rounded-full bg-border" style={{ height }}>
        <Animated.View
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"]
            })
          }}
        />
      </View>

      <View className="mt-2 flex flex-row justify-between">
        {labelStart ? (
          <Text className="font-tregular text-base text-secondary">
            {labelStart}
          </Text>
        ) : null}
        {labelEnd ? (
          <Text className="font-tmedium text-base text-primary">
            {labelEnd}
          </Text>
        ) : null}
      </View>
    </View>
  )
}
