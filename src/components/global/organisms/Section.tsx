import React from "react"

import { Text, View } from "react-native"

interface SectionProps {
  title: string
}

export const Section = ({ title }: SectionProps) => {
  return (
    <View className="mb-4 ml-1 mt-6">
      <Text className="font-tbold text-xl text-typography">{title}</Text>
    </View>
  )
}
