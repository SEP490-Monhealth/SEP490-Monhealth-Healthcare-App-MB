import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { ChevronRight } from "lucide-react-native"

import { COLORS } from "@/constants/appConstants"

interface ListItemProps {
  icon: React.ReactNode
  label: string
  onPress: () => void
}

export const ListItem = ({ icon, label, onPress }: ListItemProps) => {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between border-b border-secondary py-4"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-4 font-tmedium text-lg text-[#475569]">
          {label}
        </Text>
      </View>
      <ChevronRight size={20} color={COLORS.primary} />
    </TouchableOpacity>
  )
}
