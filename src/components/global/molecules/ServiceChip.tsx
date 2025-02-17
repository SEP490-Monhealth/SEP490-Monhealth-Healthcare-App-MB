import React from "react"

import { Text, View } from "react-native"

import { Card, HStack } from "@/components/global/atoms"

interface ServiceChipProps {
  label: string
  icon?: React.ReactNode
  isSelected: boolean

  onPress: () => void
}

export const ServiceChip = ({
  label,
  icon,
  isSelected,
  onPress
}: ServiceChipProps) => {
  return (
    <Card
      className={`flex-1 items-center justify-center rounded-2xl border-2 ${
        isSelected ? "bg-primary text-secondary" : "border-border"
      }`}
      onPress={onPress}
    >
      <HStack center>
        {icon && (
          <View className="mr-2">
            {React.cloneElement(icon as React.ReactElement, {
              color: isSelected ? "#fff" : "#334155"
            })}
          </View>
        )}

        <Text
          className={`font-tmedium text-lg ${
            isSelected ? "text-white" : "text-primary"
          }`}
        >
          {label}
        </Text>
      </HStack>
    </Card>
  )
}
