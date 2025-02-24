import React from "react"

import { Text, View } from "react-native"

interface BadgeProps {
  label: string
}

export const Badge = ({ label }: BadgeProps) => {
  return (
    <View className="rounded-lg bg-muted px-3 py-1">
      <Text className="font-tmedium text-sm text-primary">{label}</Text>
    </View>
  )
}
