import React from "react"

import { Text, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

import { COLORS } from "@/constants/appConstants"

import { cn } from "@/lib/utils"

interface CenterCircleProps {
  size: number
  innerSizeRatio: number
  calorieValue: number
  maxCalories: number
  label: string
}

const CenterCircle = ({
  size,
  innerSizeRatio,
  calorieValue,
  maxCalories,
  label
}: CenterCircleProps) => {
  return (
    <View
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform select-none items-center justify-center rounded-full bg-white"
      style={{
        width: size * innerSizeRatio,
        height: size * innerSizeRatio,
        borderWidth: 14,
        borderColor: "#fcfcfc"
      }}
    >
      <Text className="font-tbold text-2xl text-typography">
        {calorieValue} / {maxCalories}
      </Text>
      <Text className="font-tmedium text-base text-accent">{label}</Text>
    </View>
  )
}

interface ArcProgressProps {
  size: number
  width: number
  fill?: number
  tintColor?: string
  backgroundColor?: string
  arcSweepAngle: number
  rotation: number
  centerCircle?: boolean
  calorieValue: number
  maxCalories: number
  label: string
  className?: string
}

export const ArcProgress = ({
  size,
  width,
  fill = 0,
  tintColor = COLORS.primary,
  backgroundColor = "#e2e8f0",
  arcSweepAngle = 360,
  rotation = 0,
  centerCircle = false,
  calorieValue = 0,
  maxCalories = 0,
  label = "",
  className = ""
}: ArcProgressProps) => {
  return (
    <View className={cn("relative items-center", className)}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        prefill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        arcSweepAngle={arcSweepAngle}
        rotation={rotation}
        lineCap="round"
      />

      {centerCircle && (
        <CenterCircle
          size={size}
          innerSizeRatio={0.75}
          calorieValue={calorieValue}
          maxCalories={maxCalories}
          label={label}
        />
      )}
    </View>
  )
}
