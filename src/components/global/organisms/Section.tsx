import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface SectionProps {
  title: string
  margin?: boolean
  rightTitle?: string
  onPress?: () => void
  className?: string
}

export const Section = ({
  title,
  margin = true,
  rightTitle,
  onPress,
  className
}: SectionProps) => {
  const marginClass = margin ? "mt-4" : ""

  return (
    <View
      className={cn(
        "mb-2 ml-0.5 mr-1 flex-row items-center justify-between",
        marginClass,
        className
      )}
    >
      <Text className="font-tbold text-xl text-primary">{title}</Text>

      {rightTitle && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Text className="font-tregular text-base text-primary">
            {rightTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
