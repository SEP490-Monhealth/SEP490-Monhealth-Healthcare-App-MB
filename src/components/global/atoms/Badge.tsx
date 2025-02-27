import React from "react"

import { Text, View } from "react-native"

import clsx from "clsx"

import { COLORS } from "@/constants/color"

interface BadgeProps {
  label: string
  background?: string
  color?: string
  rounded?: boolean
  className?: string
}

export const Badge = ({
  label,
  background = "#f1f5f9",
  color = COLORS.primary,
  rounded = false,
  className = ""
}: BadgeProps) => {
  return (
    <View
      className={clsx(
        "px-3 py-1",
        rounded ? "rounded-xl" : "rounded-lg",
        className
      )}
      style={{ backgroundColor: background }}
    >
      <Text className="font-tmedium text-sm" style={{ color }}>
        {label}
      </Text>
    </View>
  )
}
