import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/app"

interface ListItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  label: string
  more?: boolean
  onPress?: () => void
}

export const ListItem = ({
  startIcon,
  endIcon,
  label,
  more = true,
  onPress
}: ListItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center justify-between py-4"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {startIcon && <View className="mr-4">{startIcon}</View>}
        <Text className="font-tmedium text-lg text-secondary">{label}</Text>
      </View>

      {endIcon ? (
        <View>{endIcon}</View>
      ) : (
        more && <ChevronRight size={20} color={COLORS.secondary} />
      )}
    </TouchableOpacity>
  )
}
