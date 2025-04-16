import React from "react"

import { Text } from "react-native"

import { HStack } from "@/components/global/atoms"

interface MetricItemProps {
  label: string
  value: number | string
  unit?: string
}

export const MetricItem = ({ label, value, unit }: MetricItemProps) => (
  <HStack center className="justify-between border-b border-border py-2">
    <Text className="font-tmedium text-sm text-accent">{label}</Text>
    <Text className="font-tmedium text-sm text-primary">
      {value} {unit}
    </Text>
  </HStack>
)
