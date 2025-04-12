import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

interface MetricItemProps {
  label: string
  value?: number
  unit?: string
}

export const MetricItem = ({ label, value, unit }: MetricItemProps) => (
  <View className="border-b border-border py-2">
    <HStack center className="items-center justify-between">
      <Text className="font-tmedium text-sm text-accent">{label}</Text>

      <Text className="font-tmedium text-sm text-primary">
        {value} {unit}
      </Text>
    </HStack>
  </View>
)
