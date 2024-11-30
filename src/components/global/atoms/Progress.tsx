import React, { useEffect, useRef } from "react"

import { Animated, View } from "react-native"

import { COLORS } from "@/constants/appConstants"

interface ProgressProps {
  progress: number
  height?: number
  color?: string
}

export const Progress = ({
  progress,
  height = 10,
  color = COLORS.primary
}: ProgressProps) => {
  const animatedProgress = useRef(new Animated.Value(0)).current
  const prevProgress = useRef(progress)

  useEffect(() => {
    if (progress !== prevProgress.current) {
      const toValue = progress

      Animated.timing(animatedProgress, {
        toValue,
        duration: 500,
        useNativeDriver: false
      }).start()

      prevProgress.current = progress
    }
  }, [progress])

  return (
    <View className="w-full rounded-full bg-slate-200">
      <Animated.View
        className="h-full rounded-full"
        style={{
          width: animatedProgress.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"]
          }),
          height: height,
          backgroundColor: color
        }}
      />
    </View>
  )
}
