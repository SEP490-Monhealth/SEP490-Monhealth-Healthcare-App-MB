import React from "react"

import { Text, View } from "react-native"

import { HStack } from "@/components/global/atoms"

import { getUnitByLabel } from "@/utils/helpers"

interface WorkoutCardProps {
  label: string
  value: number
  targetValue: number
  color: string
}

export const WorkoutCard = ({
  label,
  value,
  targetValue,
  color
}: WorkoutCardProps) => {
  const unit = getUnitByLabel(label)
  return (
    <View>
      <HStack gap={6} center>
        <View
          className="rounded-full"
          style={{
            width: 10,
            height: 10,
            backgroundColor: color
          }}
        />
        <Text className="font-tmedium text-base leading-4 text-accent">
          {label}
        </Text>
      </HStack>

      <Text className="font-tbold text-sm text-primary">
        {value} / {targetValue} {unit}
      </Text>
    </View>
  )
}
