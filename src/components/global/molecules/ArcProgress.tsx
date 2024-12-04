import React from "react"

import { Text, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

import { COLORS } from "@/constants/appConstants"

import { cn } from "@/lib/utils"

interface CenterCircleProps {
  size: number
  innerSizeRatio: number
  currentValue: number
  totalValue: number
  label: string
}

const CenterCircle = ({
  size,
  innerSizeRatio,
  currentValue,
  totalValue,
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
      <Text className="font-dbold text-2xl text-primary">
        {currentValue} / {totalValue}
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
  currentValue: number
  totalValue: number
  label: string
  className?: string
}

export const ArcProgress = ({
  size,
  width,
  fill = 0,
  tintColor = COLORS.primary,
  backgroundColor = "#E2E8F0",
  arcSweepAngle = 360,
  rotation = 0,
  centerCircle = false,
  currentValue = 0,
  totalValue = 0,
  label = "",
  className = ""
}: ArcProgressProps) => {
  return (
    <View className={cn("relative items-center", className)}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        arcSweepAngle={arcSweepAngle}
        rotation={rotation}
        lineCap="round"
      />

      {centerCircle && (
        <CenterCircle
          size={size}
          innerSizeRatio={0.77}
          currentValue={currentValue}
          totalValue={totalValue}
          label={label}
        />
      )}
    </View>
  )
}
