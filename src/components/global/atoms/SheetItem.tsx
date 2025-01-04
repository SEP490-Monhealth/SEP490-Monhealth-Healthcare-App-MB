import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack } from "./Stack"

interface SheetItemProps {
  item: string
  isSelected: boolean
  onSelect: (item: string) => void
}

interface SheetSelectProps {
  variant?: "default" | "danger"
  label: string
  icon: React.ReactNode
  onPress: () => void
}

export const SheetItem = ({ item, isSelected, onSelect }: SheetItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onSelect(item)}
      className="border-b border-border py-3"
    >
      <Text
        className={`text-center ${isSelected ? "font-tmedium text-lg text-primary" : "text-base text-accent"}`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  )
}

export const SheetSelect = ({
  variant = "default",
  icon,
  label,
  onPress
}: SheetSelectProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <HStack center>
        <View className="mr-2">{icon}</View>
        <Text
          className={`font-tmedium text-lg ${
            variant === "danger" ? "text-red-500" : "text-primary"
          }`}
        >
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
