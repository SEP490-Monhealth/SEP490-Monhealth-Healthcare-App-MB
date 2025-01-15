import React from "react"

import { Text, TouchableOpacity, View } from "react-native"

import { HStack } from "./Stack"

interface SheetItemProps {
  item: string
  isSelected: boolean
  onSelect: (item: string) => void
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

interface SheetSelectProps {
  variant?: "default" | "danger"
  disabled?: boolean
  label: string
  icon: React.ReactNode
  onPress?: () => void
}

export const SheetSelect = ({
  variant = "default",
  disabled = false,
  icon,
  label,
  onPress
}: SheetSelectProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={!disabled ? onPress : undefined}
      className={`border-b border-border px-4 py-3 ${disabled ? "opacity-30" : "opacity-100"}`}
    >
      <HStack center>
        <View className="mr-4">{icon}</View>
        <Text
          className={`font-tmedium text-lg ${
            variant === "danger" ? "text-destructive" : "text-primary"
          }`}
        >
          {label}
        </Text>
      </HStack>
    </TouchableOpacity>
  )
}
