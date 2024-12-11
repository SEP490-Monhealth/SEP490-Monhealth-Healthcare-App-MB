import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

interface ListItemProps {
  icon: React.ReactNode
  label: string
  more?: boolean
  onPress?: () => void
}

export const ListItem = ({
  icon,
  label,
  more = true,
  onPress
}: ListItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="y flex-row items-center justify-between py-4"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-4 font-tmedium text-lg text-[#475569]">
          {label}
        </Text>
      </View>

      {more && <ChevronRight size={20} color={COLORS.primary} />}
    </TouchableOpacity>
  )
}
