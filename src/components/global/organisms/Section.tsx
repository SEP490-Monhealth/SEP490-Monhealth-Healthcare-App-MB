import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

interface SectionProps {
  label: string
  margin?: boolean
  action?: string
  onPress?: () => void
  className?: string
}

export const Section = ({
  label,
  margin = true,
  action,
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
      <Text className="font-tmedium text-xl text-primary">{label}</Text>

      {action && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Text className="font-tregular text-base text-primary">{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
