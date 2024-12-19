import React, { useEffect, useRef } from "react"

import { Animated, Text, View } from "react-native"

import { COLORS } from "@/constants/appConstants"

interface ProgressProps {
  progress: number
  height?: number
  color?: string
  labelStart?: string
  labelEnd?: string
}

export const Progress = ({
  progress,
  height = 10,
  color = COLORS.primary,
  labelStart = "",
  labelEnd = ""
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
    <View className="w-full">
      <View className="w-full rounded-full bg-[#E2E8F0]" style={{ height }}>
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
          <Text className="font-tmedium text-base text-primary">
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
