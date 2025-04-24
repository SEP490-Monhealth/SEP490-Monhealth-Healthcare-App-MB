import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface BookingItemProps {
  icon: React.ReactNode
  label: string
  value: string | number
  onPress?: () => void
}

export const BookingItem = ({
  icon,
  label,
  value,
  onPress
}: BookingItemProps) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <HStack gap={16} className="items-center border-b border-border py-3">
      <View>{icon}</View>

      <View className="flex-1 gap-1">
        <Text className="font-tregular text-sm text-accent">{label}</Text>
        <Text className="font-tmedium text-base text-primary">{value}</Text>
      </View>
    </HStack>
  </TouchableOpacity>
)
