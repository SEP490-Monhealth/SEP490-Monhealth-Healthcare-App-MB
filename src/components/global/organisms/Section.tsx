import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/lib/utils"

import { VStack } from "../atoms"

interface SectionProps {
  label: string
  description?: string
  margin?: boolean
  action?: React.ReactNode
  actionText?: string
  onPress?: () => void
  className?: string
}

export const Section = ({
  label,
  description,
  margin = true,
  action,
  actionText,
  onPress,
  className
}: SectionProps) => {
  const marginClass = margin ? "mt-6" : ""

  return (
    <View
      className={cn(
        "mb-2 ml-0.5 mr-1 flex-row items-center justify-between",
        marginClass,
        className
      )}
    >
      <VStack gap={0}>
        <Text className="font-tmedium text-lg text-primary">{label}</Text>

        {description && (
          <Text className="font-tregular text-base text-secondary">
            {description}
          </Text>
        )}
      </VStack>

      {action}

      {actionText && (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <Text className="font-tregular text-base text-primary">
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
