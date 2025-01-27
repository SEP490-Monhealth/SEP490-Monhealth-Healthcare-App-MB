import React, { useEffect, useState } from "react"

import { Text, View } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

import { COLORS } from "@/constants/app"

import { cn } from "@/lib/utils"

import { toFixed } from "@/utils/formatters"

interface CenterCircleProps {
  variant?: "sm" | "md"
  size: number
  innerSizeRatio: number
  valueType?: "number" | "percentage"
  value: string | number
  maxValue: number
  label: string
}

const CenterCircle = ({
  variant = "md",
  size,
  innerSizeRatio,
  valueType = "number",
  value,
  maxValue,
  label
}: CenterCircleProps) => {
  const sizes = {
    sm: { title: "text-base", description: "text-sm" },
    md: { title: "text-2xl", description: "text-base" }
  }

  const sizeClass = sizes[variant]

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
      <Text className={cn("font-tbold text-primary", sizeClass.title)}>
        {valueType === "percentage" ? `${value}%` : toFixed(Number(value), 0)}
        {valueType === "number" && maxValue
          ? ` / ${toFixed(Number(maxValue), 0)}`
          : ""}
      </Text>

      <Text
        className={cn(
          "text-center font-tmedium text-accent",
          sizeClass.description
        )}
      >
        {label}
      </Text>
    </View>
  )
}

interface ArcProgressProps {
  variant?: "sm" | "md"
  size: number
  width: number
  fill?: number
  prefill?: boolean
  tintColor?: string
  backgroundColor?: string
  arcSweepAngle?: number
  rotation?: number
  centerCircle?: boolean
  valueType?: "number" | "percentage"
  value: number | string
  maxValue?: number
  label: string
  className?: string
}

export const ArcProgress = ({
  variant = "md",
  size,
  width,
  fill = 0,
  prefill = false,
  tintColor = COLORS.primary,
  backgroundColor = "#F1F5F9",
  arcSweepAngle = 360,
  rotation = 0,
  centerCircle = false,
  valueType = "number",
  value = 0,
  maxValue = 0,
  label = "",
  className = ""
}: ArcProgressProps) => {
  const [currentFill, setCurrentFill] = useState(fill)

  useEffect(() => {
    setCurrentFill(fill)
  }, [fill])

  return (
    <View className={cn("relative items-center", className)}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        prefill={prefill ? currentFill : fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        arcSweepAngle={arcSweepAngle}
        rotation={rotation}
        lineCap="round"
      />

      {centerCircle && (
        <CenterCircle
          variant={variant}
          size={size}
          innerSizeRatio={0.75}
          valueType={valueType}
          value={value}
          maxValue={maxValue}
          label={label}
        />
      )}
    </View>
  )
}
