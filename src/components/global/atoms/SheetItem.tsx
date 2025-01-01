import React from "react"

import { Text, TouchableOpacity } from "react-native"

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
        {item.toLowerCase()}
      </Text>
    </TouchableOpacity>
  )
}
