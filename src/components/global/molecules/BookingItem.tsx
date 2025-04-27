import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { HStack } from "@/components/global/atoms"

import { COLORS } from "@/constants/color"

interface BookingItemProps {
  icon: React.ReactNode
  label: string
  value: string | number
  showMore?: boolean
  onPress?: () => void
}

export const BookingItem = ({
  icon,
  label,
  value,
  showMore = false,
  onPress
}: BookingItemProps) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <HStack gap={16} className="items-center border-b border-border py-3">
      <View>{icon}</View>

      <View className="flex-1 gap-1">
        <Text className="font-tregular text-sm text-accent">{label}</Text>
        <Text className="font-tmedium text-base text-primary">{value}</Text>
      </View>

      {showMore && <ChevronRight size={20} color={COLORS.primary} />}
    </HStack>
  </TouchableOpacity>
)
