import React from "react"

import { Image, Text, TouchableOpacity, View } from "react-native"
import { ImageSourcePropType } from "react-native"

import { cn } from "@/lib/utils"

interface ChipPickerProps {
  id: string
  name: string
  isSelected: boolean
  icon?: ImageSourcePropType
  onPress: (id: string) => void
}

const variantStyles = {
  default: {
    container: "bg-muted border-border",
    text: "text-primary"
  },
  selected: {
    container: "bg-primary border-primary",
    text: "text-white"
  }
}

export const ChipPicker = ({
  id,
  name,
  isSelected,
  icon,
  onPress
}: ChipPickerProps) => {
  const styles = isSelected ? variantStyles.selected : variantStyles.default

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        `mb-4 rounded-2xl border border-border px-6 py-4 ${styles.container}`
      )}
      onPress={() => onPress(id)}
    >
      <View className="flex-row items-center">
        {icon && <Image source={icon} className="mr-4 h-10 w-10" />}
        <Text className={cn(`font-tmedium text-lg ${styles.text}`)}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
